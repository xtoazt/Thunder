// Vercel Serverless Function
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    message: 'Thundr API',
    note: 'For full functionality, use the standalone server with npm start'
  });
}

