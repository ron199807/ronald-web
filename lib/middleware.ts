import { NextApiRequest, NextApiResponse } from 'next';

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result?: any) => void
) => void;

// Initialize CORS middleware
export const corsMiddleware: Middleware = (req, res, next) => {
  // Allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'https://ronald-web-phi.vercel.app',
    /^https:\/\/ronald-.*-ron199807s-projects\.vercel\.app$/, // All preview deployments
  ];

  const origin = req.headers.origin || '';
  const isAllowed = allowedOrigins.some(allowed => {
    if (allowed instanceof RegExp) {
      return allowed.test(origin);
    }
    return allowed === origin;
  });

  // Set CORS headers
  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // In production, you might want to restrict this
    res.setHeader('Access-Control-Allow-Origin', 'https://ronald-web-phi.vercel.app');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
};

// Helper to apply middleware
export function applyMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: Middleware
): Promise<void> {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}