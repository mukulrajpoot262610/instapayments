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
import { CreditCardIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
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

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

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
          <BreadcrumbItem>
            <BreadcrumbPage className='flex items-center gap-1'>
              <TruckIcon className='h-4 w-4' />
              Checkout
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='mt-10 text-center font-bold text-3xl'>CHECKOUT</h1>
      <p className='text-center text-sm text-gray-500'>(2 items) ₹17,498.50</p>

      <div className='grid grid-cols-12 gap-4 mt-10'>
        <div className='col-span-12 lg:col-span-8'>
          <Address />
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <OrderDetails />
        </div>
      </div>
    </main>
  );
}
