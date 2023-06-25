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
      .json({ message: `${request.method} method not allowed` });
  } else if (process.env.USER_WEBHOOK_SECRET === undefined) {
    return response
      .status(500)
      .json({ message: 'Server function has misconfigured webhook secret' });
  }

  const wh = new Webhook(process.env.USER_WEBHOOK_SECRET);
  const headers = {
    'webhook-id': request.headers['svix-id'] as string,
    'webhook-signature': request.headers['svix-signature'] as string,
    'webhook-timestamp': request.headers['svix-timestamp'] as string,
  };

  let msg;

  try {
    msg = wh.verify(request.body, headers);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Webhook verification failed' });
  }

  response.status(200).json({
    message: msg,
    headers: request.headers,
    body: request.body,
  });
}
