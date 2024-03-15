'use client';

import { Button } from '@/components/ui/button';

import { ArrowBigRightDash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import AddressCard from './address-card';
import AddressForm from './address-form';

const Address = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.cart.address);

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>ADDRESS</h1>

      {!address ? (
        <AddressForm />
      ) : (
        <div>
          <AddressCard address={address} isDelete={true} />

          <Button
            onClick={() => dispatch(setCurrentStep(3))}
            className='w-full lg:w-1/3 flex items-center justify-between mt-5'
          >
            Click to Payment <ArrowBigRightDash className='h-5 w-5' />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Address;
