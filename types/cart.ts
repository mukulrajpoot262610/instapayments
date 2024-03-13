export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CustomerDetails {
  customer_id: string;
  customer_phone: string;
  customer_name: string;
}

export interface OrderMeta {
  return_url: string;
  notify_url: string;
  payment_methods: string;
}

export interface RequestData {
  customer_details: CustomerDetails;
  order_meta: OrderMeta;
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_note: string;
}

export interface Summary {
  orderAmount: number;
  deliveryCharges: number;
  discountAmount: number;
  total: number;
}
