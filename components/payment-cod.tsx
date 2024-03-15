import { setCurrentStep, setPaymentMethod } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import { TruckIcon } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import CodCard from './common/cod-card';

const PaymentCod = () => {
  const dispatch = useDispatch();
  const { selectedMethod } = useSelector((state: RootState) => state.cart);

  return (
    <div className='p-4 text-lg border gap-1 mt-2 font-bold  hover:border-black cursor-pointer'>
      <div onClick={() => dispatch(setPaymentMethod('cod'))}>
        <CodCard />
      </div>
      {selectedMethod === 'cod' && (
        <div>
          <Button
            type='submit'
            className='w-full mt-4'
            onClick={() => dispatch(setCurrentStep(4))}
          >
            Order Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentCod;
