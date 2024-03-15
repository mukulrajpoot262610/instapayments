import React, { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import CardPaymentForm from './payment-card-form';
import Card from './common/card-card';

const CardPayment = () => {
  const { selectedMethod } = useSelector((state: RootState) => state.cart);
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
    <div className='relative p-4 border hover:border-black'>
      {loading && (
        <div className='h-full w-full absolute top-0 left-0 bg-black/[0.8] text-white flex flex-col items-center justify-center z-50'>
          <Loader2 className='animate-spin' />
          <p className='mt-2 font-normal'>Waiting for Payment</p>
          <p className='text-xs font-normal'>
            Please do not refresh or press back.
          </p>
          <p className='mt-4'>
            Waiting: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </p>
        </div>
      )}
      <Card />
      {selectedMethod === 'card' && <CardPaymentForm setLoading={setLoading} />}
    </div>
  );
};

export default CardPayment;
