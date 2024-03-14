import { PaymentApiPayload, SessionApiPayload } from '@/types/cashfree';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSession = (data: SessionApiPayload) =>
  api.post('/api/session', data);

export const makePayment = (data: PaymentApiPayload) =>
  api.post('/api/payment', data);

export const checkStatus = (id: string) => api.post(`/api/check/${id}`);

export default api;
