'use client';

import { Button } from '@/components/ui/button';

import { ArrowBigRightDash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '@/global/cartSlice';
import { RootState } from '@/global/store';
import AddressCard from './address-card';
import AddressForm from './address-form';
import toast from 'react-hot-toast';

const Address = () => {
  const dispatch = useDispatch();
  const { address, summary } = useSelector((state: RootState) => state.cart);

  const handleProceed = () => {
    if (summary.total === 0) {
      return toast.error('Please add some item to cart.');
    }
    dispatch(setCurrentStep(3));
  };

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>ADDRESS</h1>

      {!address ? (
        <AddressForm />
      ) : (
        <div>
          <AddressCard address={address} isDelete={true} />

          <Button
            onClick={handleProceed}
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
