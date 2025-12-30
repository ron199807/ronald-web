import type { NextApiRequest, NextApiResponse } from 'next';
import { applyMiddleware, corsMiddleware } from '@/lib/middleware';
import { rateLimiter } from '@/lib/rate-limiter';
import { validateContactForm } from '@/lib/validation';
import { createEmailService } from '@/lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Apply CORS middleware
    await applyMiddleware(req, res, corsMiddleware);

    // Only allow POST method
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} Not Allowed`,
      });
    }

    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] as string || 
                     req.socket.remoteAddress || 
                     'unknown';
    
    // Apply rate limiting
    const rateLimit = rateLimiter.check(clientIp);
    if (!rateLimit.allowed) {
      res.setHeader('X-RateLimit-Limit', '5');
      res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
      res.setHeader('X-RateLimit-Reset', rateLimit.reset.toISOString());
      
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        reset: rateLimit.reset.toISOString(),
      });
    }

    // Validate request body
    const validation = validateContactForm(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Initialize email service
    const emailService = createEmailService();
    
    // Test connection first
    const isConnected = await emailService.testConnection();
    if (!isConnected) {
      throw new Error('Email service not available');
    }

    // Send email
    const messageId = await emailService.sendContactEmail(validation.data!);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', '5');
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
    res.setHeader('X-RateLimit-Reset', rateLimit.reset.toISOString());

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Contact API error:', error);

    // Handle specific errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed',
      });
    }

    if (error.code === 'EENVELOPE') {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
      }),
    });
  }
}