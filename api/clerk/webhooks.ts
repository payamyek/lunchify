//import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Webhook } from 'svix';

import type { Readable } from 'node:stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // only allow POST calls
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response
      .status(405)
      .json({ error: `${request.method} method not allowed` });
  } else if (process.env.USER_WEBHOOK_SECRET === undefined) {
    return response
      .status(500)
      .json({ error: 'Server function has misconfigured webhook secret' });
  }

  const headers = {
    'webhook-id': request.headers['svix-id'] as string,
    'webhook-signature': request.headers['svix-signature'] as string,
    'webhook-timestamp': request.headers['svix-timestamp'] as string,
  };

  const buf = await buffer(request);
  const rawBody = buf.toString('utf8');

  let msg;

  try {
    const wh = new Webhook(process.env.USER_WEBHOOK_SECRET);
    msg = wh.verify(rawBody, headers);
  } catch (err) {
    return response.status(400).json({
      error: err instanceof Error ? err.toString() : '',
    });
  }

  response.status(200).json({ msg });
}
