import { RootState } from '@/global/store';
import React from 'react';
import { useSelector } from 'react-redux';
import AddressCard from './address-card';
import Card from './common/card-card';
import UpiCard from './common/upi-card';
import CodCard from './common/cod-card';

const OrderConfirmation = () => {
  const { address, selectedMethod, order } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className='bg-background p-6 border'>
      <h1 className='uppercase font-bold text-2xl mb-4'>
        ThankYou, <br /> Your order has been placed
      </h1>

      <p>
        We received your order{' '}
        <span className='underline font-semibold'>
          {order && order[0]?.order_id}
        </span>{' '}
        and it is in process.
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
            <div className='border border-foreground p-4'>
              <Card />
            </div>
          )}
          {selectedMethod === 'upi' && (
            <div className='border border-foreground p-4'>
              <UpiCard />
            </div>
          )}
          {selectedMethod === 'cod' && (
            <div className='border border-foreground p-4'>
              <CodCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
