import React from 'react';
import { z } from 'zod';
import { FormSchema } from './address';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteAddress } from '@/global/cartSlice';

interface AddressCardProps {
  address: z.infer<typeof FormSchema>;
  isDelete: boolean;
}

const AddressCard = ({ address, isDelete }: AddressCardProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAddress());
  };

  return (
    <div className='border p-4 border-black'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold mb-3'>
          {address.firstName} {address.lastName}
        </h1>
        {isDelete && (
          <Button variant='ghost' size='sm' onClick={handleDelete}>
            <Trash2 className='h-4 w-4' />
          </Button>
        )}
      </div>

      <p className='text-sm font-light'>{address.street}</p>
      <p className='text-sm font-light'>{address.landmark}</p>
      <p className='text-sm font-light'>
        {address.city}, {address.pincode},{address.state}, {address.country}
      </p>
      <p className='text-sm font-light mt-1'>{address.mobile}</p>
    </div>
  );
};

export default AddressCard;
