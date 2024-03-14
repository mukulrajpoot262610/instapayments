'use client';

import Address from '@/components/address';
import OrderDetails from '@/components/order-detail';
import { CreditCard, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethods, setProducts, setSummary } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import Payment from '@/components/payment';
import { Product } from '@/types/cart';
import OrderConfirmation from '@/components/order-confirmation';

export default function Home() {
  const dispatch = useDispatch();
  const { currentStep, summary, cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://groww-intern-assignment.vercel.app/v1/api/order-details',
          {
            method: 'GET',
            headers: {
              ContentType: 'application/json',
            },
          }
        );

        const data: { paymentMethods: string[]; products: Product[] } =
          await response.json();

        dispatch(setPaymentMethods(data.paymentMethods));
        dispatch(setProducts(data.products));

        const orderAmount = data.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        const deliveryCharges = orderAmount * 0.02;
        const discountAmount = orderAmount * 0.1;
        const total = orderAmount - discountAmount + deliveryCharges;

        dispatch(
          setSummary({
            orderAmount,
            deliveryCharges,
            discountAmount,
            total,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <main className='min-h-[calc(100vh-5rem)] max-w-6xl mx-auto p-2 lg:p-6'>
      <h1 className='mt-10 text-center font-bold text-3xl uppercase'>
        {currentStep === 2 && 'Delivery'}
        {currentStep === 3 && 'Payment'}
        {currentStep === 4 && 'Order Complete'}
      </h1>
      <p className='text-center text-sm text-gray-500'>
        ({cartItems.length} items) ₹{summary.orderAmount.toFixed(2)}
      </p>

      <div className='grid grid-cols-12 gap-4 mt-10'>
        <div className='col-span-12 lg:col-span-8'>
          {currentStep === 2 && <Address />}
          {currentStep === 3 && <Payment />}
          {currentStep === 4 && <OrderConfirmation />}
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <OrderDetails />
        </div>
      </div>
    </main>
  );
}
