import { RootState } from '@/global/store';
import React from 'react';
import { useSelector } from 'react-redux';
import AddressCard from './address-card';
import Image from 'next/image';

const OrderConfirmation = () => {
  const { address, selectedMethod, order } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-2xl mb-4'>
        ThankYou, <br /> Your order has been placed
      </h1>

      <p>
        We received your order{' '}
        <span className='underline font-semibold'>{order[0].order_id}</span> and
        it is in process.
      </p>

      <p className='mt-3'>
        We&apos;ll send you an order confirmation notification on your Mobile{' '}
        <span className='underline font-semibold'>{address?.mobile}</span>{' '}
        within 5 minutes.
      </p>

      <hr className='my-5' />

      <h2 className='uppercase font-bold text-xl mb-2'>YOUR ORDER</h2>
      <div className='grid grid-cols-1'>
        <div>
          <h3 className='font-semibold mb-2'>Delivery Address</h3>
          {address && <AddressCard address={address} isDelete={false} />}
        </div>
        <div>
          <h3 className='font-semibold mb-2 mt-4'>Billing Address</h3>
          {address && <AddressCard address={address} isDelete={false} />}
        </div>
        <div>
          <h3 className='font-semibold mb-2 mt-4'>Payment Method</h3>
          {selectedMethod === 'card' && (
            <div className='flex items-center justify-between border p-4 border-black font-bold'>
              CARD
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
            </div>
          )}
          {selectedMethod === 'upi' && (
            <div className='flex items-center justify-between border border-black p-4'>
              UPI
              <Image
                src='/upi.svg'
                height={100}
                width={100}
                alt='UPI'
                className='h-auto w-16 mr-1'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
