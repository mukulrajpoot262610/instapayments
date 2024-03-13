import { RequestData } from '@/types/cart';
import axios from 'axios';

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  'x-api-version': '2023-08-01',
  'x-client-id': process.env.NEXT_PUBLIC_CF_CLIENT_ID,
  'x-client-secret': process.env.NEXT_PUBLIC_CF_SECRET_KEY,
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CF_BASE_ENDPOINT,
  withCredentials: true,
  headers,
});

export const createOrder = (data: RequestData) => api.post('/pg/orders', data);

export default api;
