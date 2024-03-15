import React from 'react';
import Alert from './common/alert';
import PaymentOptions from './payment-options';

const Payment = () => {
  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>Payment Options</h1>
      <Alert />
      <PaymentOptions />
    </div>
  );
};

export default Payment;
