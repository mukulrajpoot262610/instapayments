'use server';

import { PaymentApiPayload, RequestData } from '@/types/cart';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const {
  NEXT_PUBLIC_CF_CLIENT_ID,
  NEXT_PUBLIC_CF_SECRET_KEY,
  NEXT_PUBLIC_CF_BASE_ENDPOINT,
} = process.env;

export async function GET() {
  return NextResponse.json({ msg: 'API Health OK' });
}

export async function POST(req: Request) {
  const { address, summary }: PaymentApiPayload = await req.json();

  try {
    if (
      !NEXT_PUBLIC_CF_CLIENT_ID ||
      !NEXT_PUBLIC_CF_SECRET_KEY ||
      !NEXT_PUBLIC_CF_BASE_ENDPOINT
    ) {
      throw new Error('Keys not found');
    }

    const payload: RequestData = {
      customer_details: {
        customer_id: `CID-${uuidv4()}`,
        customer_phone: address.mobile,
        customer_name: address.firstName + ' ' + address.lastName,
      },
      order_meta: {
        return_url: 'https://example.com/return?order_id=myOrderId',
        notify_url: 'https://example.com/cf_notify',
        payment_methods: 'upi',
      },
      order_id: `OID-${uuidv4()}`,
      order_amount: parseInt(summary.total.toFixed(2)),
      order_currency: 'INR',
      order_note: 'Groww',
    };

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_CF_CLIENT_ID,
      'x-client-secret': process.env.NEXT_PUBLIC_CF_SECRET_KEY,
    };

    const { data } = await axios.post(
      `${NEXT_PUBLIC_CF_BASE_ENDPOINT}/pg/orders`,
      payload,
      {
        headers,
      }
    );

    return NextResponse.json({ paymentSessionId: data.payment_session_id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
