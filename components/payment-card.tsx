import React, { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import CardPaymentForm from './payment-card-form';
import Card from './common/card-card';
import Image from 'next/image';

const CardPayment = () => {
  const { selectedMethod, orderStatus } = useSelector(
    (state: RootState) => state.cart
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading]);

  return (
    <div className='relative p-4 border hover:border-foreground'>
      {loading && (
        <div className='h-screen w-full fixed top-0 left-0 bg-black/[0.8] text-white flex flex-col items-center justify-center z-50'>
          {orderStatus === 'failure' ? (
            <>
              <Image src='/failure.gif' height={200} width={200} alt='' />
              <p className='mt-2 font-normal'>Payment Failed</p>
              <p className='text-xs font-normal'>
                Please try again in some time.
              </p>
            </>
          ) : orderStatus === 'success' ? (
            <>
              <Image src='/success.gif' height={200} width={200} alt='' />
              <p className='mt-2 font-normal'>Payment Success</p>
              <p className='text-xs font-normal flex items-center gap-2'>
                redirecting <Loader2 className='h-3 w-3 animate-spin' />
              </p>
            </>
          ) : (
            <>
              <Loader2 className='animate-spin' />
              <p className='mt-2 font-normal'>Waiting for Payment</p>
              <p className='text-xs font-normal'>
                Please do not refresh or press back.
              </p>
              <p className='mt-4'>
                Waiting: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </>
          )}
        </div>
      )}
      <Card />
      {selectedMethod === 'card' && <CardPaymentForm setLoading={setLoading} />}
    </div>
  );
};

export default CardPayment;
