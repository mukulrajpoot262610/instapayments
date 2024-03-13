import { RootState } from '@/global/store';
import { makePayment } from '@/services/api-service';
import axios from 'axios';
import { Fingerprint, TruckIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UPIPayment from './payment-upi';
import CardPayment from './payment-card';
import { setPaymentMethod } from '@/global/cartSlice';
import PaymentCod from './payment-cod';

const Payment = () => {
  const { paymentMethods, address, summary } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const handlePayment = async (method: string) => {
    if (!address) {
      return;
    }

    // try {
    //   const { data } = await makePayment({ address, summary });

    //   let checkoutOptions = {
    //     payment_session_id: data.paymentSessionId,
    //     payment_method: {
    //       upi: {
    //         channel: 'qrcode',
    //       },
    //     },
    //   };

    //   const headers = {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     'x-api-version': '2023-08-01',
    //     'x-client-id': process.env.NEXT_PUBLIC_CF_CLIENT_ID,
    //     'x-client-secret': process.env.NEXT_PUBLIC_CF_SECRET_KEY,
    //   };

    //   const { data: data2 } = await axios.post(
    //     'https://sandbox.cashfree.com/pg/orders/sessions',
    //     checkoutOptions,
    //     { headers }
    //   );

    //   console.log(data2);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>Payment Options</h1>

      <div className='p-2 lg:p-4 bg-blue-50 text-blue-700 border border-blue-500 flex items-center gap-1 mt-2 text-xs'>
        <Fingerprint className='h-4 w-4 mr-1' />
        Payments are SSL encrypted so that your credit card and payment details
        stay safe.
      </div>

      <div className='mt-6'>
        {paymentMethods.map((pay, index) => (
          <div
            key={index}
            className='p-4 text-lg border gap-1 mt-2 font-bold  hover:border-black cursor-pointer'
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
    </div>
  );
};

export default Payment;
