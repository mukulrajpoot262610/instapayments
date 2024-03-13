import { RootState } from '@/global/store';
import { createOrder } from '@/services/api-service';
import { RequestData } from '@/types/cart';
import { Fingerprint, SquareSlashIcon, TruckIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
  const { paymentMethods, address, summary } = useSelector(
    (state: RootState) => state.cart
  );

  const handlePayment = async (method: string) => {
    if (!address) {
      return;
    }

    const payload: RequestData = {
      customer_details: {
        customer_id: `CID-${uuidv4()}`,
        customer_phone: address.mobile,
        customer_name: address.firstName + ' ' + address.lastName,
      },
      order_meta: {
        return_url: 'https://example.com/return?order_id=myOrderId',
        notify_url: 'https://example.com/cf_notify',
        payment_methods: 'upi',
      },
      order_id: `OID-${uuidv4()}`,
      order_amount: parseInt(summary.total.toFixed(2)),
      order_currency: 'INR',
      order_note: 'Groww',
    };

    try {
      const { data } = await createOrder(payload);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>Payment Options</h1>

      <div className='p-4 bg-blue-50 text-blue-700 border border-blue-500 flex items-center gap-1 mt-2 text-xs'>
        <Fingerprint className='h-4 w-4 mr-1' />
        Payments are SSL encrypted so that your credit card and payment details
        stay safe.
      </div>

      <div className='mt-6'>
        {paymentMethods.map((pay, index) => (
          <div
            key={index}
            className='p-4 text-lg border gap-1 mt-2 font-bold flex items-center justify-between hover:border-black cursor-pointer'
            onClick={() => handlePayment(pay)}
          >
            {pay}
            {pay === 'UPI' && (
              <Image
                src='/upi.svg'
                height={100}
                width={100}
                alt='UPI'
                className='h-auto w-16 mr-1'
              />
            )}
            {pay === 'CARDS' && (
              <div className='flex items-center gap-1'>
                <Image
                  src='/master-card.svg'
                  height={100}
                  width={100}
                  alt='UPI'
                  className='h-auto w-8 mr-1'
                />
                <Image
                  src='/visa.svg'
                  height={100}
                  width={100}
                  alt='UPI'
                  className='h-auto w-10 mr-1'
                />
                <Image
                  src='/rupay.svg'
                  height={100}
                  width={100}
                  alt='UPI'
                  className='h-auto w-16 mr-1'
                />
              </div>
            )}
          </div>
        ))}

        <div className='p-4 text-lg border gap-1 mt-2 font-bold flex items-center justify-between hover:border-black cursor-pointer'>
          <p className='flex flex-col'>
            Cash On Delivery
            <span className='text-xs font-light text-gray-500'>
              Pay directly to the driver.
            </span>
          </p>
          <TruckIcon className='h-8 w-8' />
        </div>
      </div>
    </div>
  );
};

export default Payment;
