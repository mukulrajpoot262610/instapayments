import { FormSchema } from '@/schema/address-form';
import { CustomerDetails, OrderMeta, Summary } from './cart';
import { z } from 'zod';

export interface CardPaymentMethod {
  card: {
    channel: string;
    card_number: string;
    card_expiry_mm: string;
    card_expiry_yy: string;
    card_cvv: string;
    card_holder_name: string;
  };
}

export interface UpiPaymentMethod {
  upi: {
    channel: string;
    upi_id?: string;
  };
}

export interface PaymentApiRequestData {
  payment_session_id: string;
  payment_method: CardPaymentMethod | UpiPaymentMethod;
  save_instrument?: boolean;
}

export interface PaymentApiPayload {
  payment_session_id: string;
  channel: string;
  card_cvv?: string;
  card_expiry_mm?: string;
  card_expiry_yy?: string;
  card_number?: string;
  card_holder_name?: string;
  upi_id?: string;
  method: string;
}

export interface SessionApiRequestData {
  customer_details: CustomerDetails;
  order_meta: OrderMeta;
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_note: string;
}

export interface SessionApiPayload {
  address: z.infer<typeof FormSchema>;
  summary: Summary;
  selectedMethod: 'upi' | 'cc, dc';
}
