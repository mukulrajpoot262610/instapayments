import React from 'react';

const OrderConfirmation = () => {
  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-2xl mb-4'>
        ThankYou, <br /> Your order has been placed
      </h1>

      <p>
        We received your order{' '}
        <span className='underline font-semibold'>82374t683</span> and it is in
        process.
      </p>

      <p className='mt-3'>
        We&apos;ll send you an order confirmation notification on your Mobile{' '}
        <span className='underline font-semibold'>6392025617</span> within 5
        minutes.
      </p>

      <hr className='my-5' />

      <h2 className='uppercase font-bold text-xl mb-2'>YOUR ORDER</h2>
      <div className='grid grid-cols-2'>
        <div>
          <h3>Delivery Address</h3>
        </div>
        <div>
          <h3>Payment Method</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
