'use server';

import axios from 'axios';
import { NextResponse } from 'next/server';

const {
  NEXT_PUBLIC_CF_CLIENT_ID,
  NEXT_PUBLIC_CF_SECRET_KEY,
  NEXT_PUBLIC_CF_BASE_ENDPOINT,
} = process.env;

export async function GET() {
  return NextResponse.json({ msg: 'API Health OK' });
}

export async function POST(req: Request) {
  const id = req.url.split('/')[5];

  try {
    if (
      !NEXT_PUBLIC_CF_CLIENT_ID ||
      !NEXT_PUBLIC_CF_SECRET_KEY ||
      !NEXT_PUBLIC_CF_BASE_ENDPOINT
    ) {
      throw new Error('Keys not found');
    }

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_CF_CLIENT_ID,
      'x-client-secret': process.env.NEXT_PUBLIC_CF_SECRET_KEY,
    };

    const { data } = await axios.get(
      `${NEXT_PUBLIC_CF_BASE_ENDPOINT}/pg/orders/${id}`,
      {
        headers,
      }
    );

    console.log(data);
    return NextResponse.json({ data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
