//import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Webhook } from 'svix';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // only allow POST calls
  if (request.method !== 'POST') {
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

  let msg;

  try {
    const wh = new Webhook(process.env.USER_WEBHOOK_SECRET);
    msg = wh.verify(request.body, headers);
    msg;
  } catch (err) {
    return response.status(400).json({
      message: 'Webhook verification failed',
      error: err instanceof Error ? err.toString() : '',
    });
  }

  response.status(204);
}
