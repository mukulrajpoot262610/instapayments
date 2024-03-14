'use server';

import { PaymentApiPayload, PaymentApiRequestData } from '@/types/cashfree';
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
  const {
    payment_session_id,
    channel,
    card_cvv,
    card_expiry_mm,
    card_expiry_yy,
    card_number,
    card_holder_name,
    upi_id,
    method,
  }: PaymentApiPayload = await req.json();

  try {
    if (
      !NEXT_PUBLIC_CF_CLIENT_ID ||
      !NEXT_PUBLIC_CF_SECRET_KEY ||
      !NEXT_PUBLIC_CF_BASE_ENDPOINT
    ) {
      throw new Error('Keys not found');
    }

    let payload: PaymentApiRequestData;

    if (method === 'card') {
      payload = {
        payment_session_id,
        payment_method: {
          card: {
            channel: 'link',
            card_number: card_number!,
            card_holder_name: card_holder_name!,
            card_expiry_mm: card_expiry_mm!,
            card_expiry_yy: card_expiry_yy!,
            card_cvv: card_cvv!,
          },
        },
        save_instrument: true,
      };
    } else {
      if (channel === 'collect') {
        payload = {
          payment_session_id,
          payment_method: {
            upi: {
              channel: 'collect',
              upi_id,
            },
          },
        };
      } else {
        payload = {
          payment_session_id,
          payment_method: {
            upi: {
              channel: 'qrcode',
            },
          },
        };
      }
    }

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_CF_CLIENT_ID,
      'x-client-secret': process.env.NEXT_PUBLIC_CF_SECRET_KEY,
    };

    const { data } = await axios.post(
      `${NEXT_PUBLIC_CF_BASE_ENDPOINT}/pg/orders/sessions`,
      payload,
      {
        headers,
      }
    );

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
