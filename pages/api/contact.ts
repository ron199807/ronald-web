import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

// Helper function to set CORS headers
const setCorsHeaders = (res: NextApiResponse, origin?: string) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://ronald-web-phi.vercel.app',
    'https://ronald-*.vercel.app', // Wildcard for preview deployments
  ];

  // Check if the origin is allowed or use wildcard
  const requestOrigin = origin || '';
  const isAllowed = allowedOrigins.some(allowed => 
    allowed.includes('*') ? true : allowed === requestOrigin
  );

  res.setHeader('Access-Control-Allow-Origin', isAllowed ? requestOrigin : allowedOrigins[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Set CORS headers
  const origin = req.headers.origin;
  setCorsHeaders(res, origin as string);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    console.log('Attempting to send email...');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `Portfolio Contact <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact from ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send email';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Check your credentials.';
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email address provided.';
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}