import { TruckIcon } from 'lucide-react';
import React from 'react';

const CodCard = () => {
  return (
    <div className='flex items-center justify-between'>
      <p className='flex flex-col'>
        Cash On Delivery
        <span className='text-xs font-light text-gray-500'>
          Pay directly to the driver.
        </span>
      </p>
      <TruckIcon className='h-8 w-8' />
    </div>
  );
};

export default CodCard;
