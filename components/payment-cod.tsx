import { setPaymentMethod } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import { TruckIcon } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';

const PaymentCod = () => {
  const dispatch = useDispatch();
  const { selectedMethod } = useSelector((state: RootState) => state.cart);

  return (
    <div className='p-4 text-lg border gap-1 mt-2 font-bold  hover:border-black cursor-pointer'>
      <div
        className='flex items-center justify-between'
        onClick={() => dispatch(setPaymentMethod('cod'))}
      >
        <p className='flex flex-col'>
          Cash On Delivery
          <span className='text-xs font-light text-gray-500'>
            Pay directly to the driver.
          </span>
        </p>
        <TruckIcon className='h-8 w-8' />
      </div>
      {selectedMethod === 'cod' && (
        <div>
          <Button type='submit' className='w-full mt-4'>
            Order Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentCod;
