import Image from 'next/image';
import React from 'react';

const UpiCard = () => {
  return (
    <div className='flex items-center justify-between'>
      UPI
      <Image
        src='/upi.svg'
        height={100}
        width={100}
        alt='UPI'
        className='h-auto w-16 mr-1'
      />
    </div>
  );
};

export default UpiCard;
