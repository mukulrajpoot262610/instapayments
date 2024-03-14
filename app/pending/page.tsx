'use client';

import { setOrderStatus } from '@/global/cartSlice';
import { checkStatus } from '@/services/api-service';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Pending = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [status, setStatus] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await checkStatus(order_id!);
        setStatus(data.data.order_status);
        dispatch(setOrderStatus('success'));
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStatus();
  }, [order_id, router, dispatch]);

  console.log(status);

  return (
    <main className='min-h-screen fixed z-50 top-0 left-0 bg-muted w-full p-2 lg:p-6 flex justify-center items-center'>
      {status === 'PAID' ? (
        <div className='w-96 bg-white border rounded-lg flex items-center justify-center flex-col py-20'>
          <Loader className='h-16 w-16 animate-spin' />
          <h1 className='mt-8 font-semibold text-lg'>Order Placed</h1>
        </div>
      ) : (
        <div className='w-96 bg-white border rounded-lg flex items-center justify-center flex-col py-20'>
          <Loader className='h-16 w-16 animate-spin' />
          <h1 className='mt-8 font-semibold text-lg'>
            Processing your payment
          </h1>
        </div>
      )}
    </main>
  );
};

export default Pending;
