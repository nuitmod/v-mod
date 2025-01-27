// export function GET(request: Request) {
//     return new Response(`Hello from ${process.env.APY_KEY}`);
//   }

import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export default function handler(request: VercelRequest, response: VercelResponse) {
 // const { name = 'World' } = request.query;
  response.send(`Hello from ${process.env.APY_KEY}`);
}