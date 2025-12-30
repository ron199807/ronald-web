import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  timestamp: string;
  method: string;
  env: {
    hasEmailUser: boolean;
    hasEmailPass: boolean;
    hasEmailTo: boolean;
    nodeEnv: string | undefined;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    message: 'Pages Router API is working!',
    timestamp: new Date().toISOString(),
    method: req.method || 'GET',
    env: {
      hasEmailUser: !!process.env.EMAIL_SERVER_USER,
      hasEmailPass: !!process.env.EMAIL_SERVER_PASSWORD,
      hasEmailTo: !!process.env.EMAIL_TO,
      nodeEnv: process.env.NODE_ENV,
    },
  });
}