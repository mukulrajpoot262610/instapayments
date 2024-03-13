'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Address from '@/components/address';
import OrderDetails from '@/components/order-detail';
import { CreditCard, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethods, setProducts } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import Payment from '@/components/payment';

export default function Home() {
  const dispatch = useDispatch();
  const { currentStep, cartItems } = useSelector(
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

        const data = await response.json();

        dispatch(setPaymentMethods(data.paymentMethods));
        dispatch(setProducts(data.products));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <main className='min-h-[calc(100vh-5rem)] max-w-6xl mx-auto p-2 lg:p-6'>
      <Breadcrumb className='hidden lg:block'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className='flex items-center gap-1 cursor-pointer'>
              <ShoppingCartIcon className='h-4 w-4' /> Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {currentStep === 'shipping' && (
            <BreadcrumbItem>
              <BreadcrumbPage className='flex items-center gap-1 capitalize'>
                <TruckIcon className='h-4 w-4' />
                Shipping
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
          {currentStep === 'payment' && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink className='flex items-center gap-1 capitalize'>
                  <TruckIcon className='h-4 w-4' />
                  Shipping
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='flex items-center gap-1 capitalize'>
                  <CreditCard className='h-4 w-4' />
                  Payment
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='mt-10 text-center font-bold text-3xl uppercase'>
        {currentStep}
      </h1>
      <p className='text-center text-sm text-gray-500'>
        ({cartItems.length} items) ₹
        {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
      </p>

      <div className='grid grid-cols-12 gap-4 mt-10'>
        <div className='col-span-12 lg:col-span-8'>
          {currentStep === 'shipping' && <Address />}
          {currentStep === 'payment' && <Payment />}
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <OrderDetails />
        </div>
      </div>
    </main>
  );
}
