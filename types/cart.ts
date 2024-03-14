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
  payment_methods: string;
}

export interface Summary {
  orderAmount: number;
  deliveryCharges: number;
  discountAmount: number;
  total: number;
}
