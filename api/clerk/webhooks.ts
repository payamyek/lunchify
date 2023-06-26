//import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
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

  // convert request body to raw body
  const buf = await buffer(request);
  const rawBody = buf.toString('utf8');

  // webhook data
  let data;

  try {
    const wh = new Webhook(process.env.USER_WEBHOOK_SECRET);

    // verify integrity of webhook
    data = wh.verify(
      rawBody,
      request.headers as {
        'svix-id': string;
        'svix-signature': string;
        'svix-timestamp': string;
      }
    ) as WebhookEvent;
  } catch (err) {
    return response.status(400).json({
      error: err instanceof Error ? err.toString() : '',
    });
  }

  if (data.type === 'user.created') {
    const tableName = `${process.env.POSTGRES_TABLE_PREFIX}_users`;

    // create users table
    await sql`CREATE TABLE IF NOT EXISTS ${tableName} (
      id TEXT,
      username TEXT,
      food_preferences TEXT[],
      dietary_restrictions TEXT[]);`;

    // store user id in table
    await sql`INSERT INTO ${tableName} (id, username) VALUES (${data.data.id}, ${data.data.username})`;
  }

  // send success response
  response.status(204);
}
