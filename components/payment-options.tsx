'use client';

import { setPaymentMethod } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UPIPayment from './payment-upi';
import CardPayment from './payment-card';
import PaymentCod from './payment-cod';

const PaymentOptions = () => {
  const { paymentMethods } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className='mt-6'>
      {paymentMethods.map((pay, index) => (
        <div
          key={index}
          className='text-lg border gap-1 mt-2 font-bold hover:border-black cursor-pointer'
          onClick={() =>
            dispatch(
              setPaymentMethod(
                pay === 'UPI' ? 'upi' : pay === 'CARDS' ? 'card' : 'cod'
              )
            )
          }
        >
          {pay === 'UPI' && <UPIPayment />}
          {pay === 'CARDS' && <CardPayment />}
        </div>
      ))}
      <PaymentCod />
    </div>
  );
};

export default PaymentOptions;
