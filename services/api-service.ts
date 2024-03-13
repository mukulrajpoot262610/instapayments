import { PaymentApiPayload } from '@/types/cart';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const makePayment = (data: PaymentApiPayload) =>
  api.post('/api/payment', data);

export default api;
