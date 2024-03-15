import Image from 'next/image';
import React from 'react';

const Card = () => {
  return (
    <div className='flex items-center justify-between'>
      CARDS
      <div className='flex items-center gap-1'>
        <Image
          src='/master-card.svg'
          height={100}
          width={100}
          alt='UPI'
          className='h-auto w-8 mr-1'
        />
        <Image
          src='/visa.svg'
          height={100}
          width={100}
          alt='UPI'
          className='h-auto w-10 mr-1'
        />
        <Image
          src='/rupay.svg'
          height={100}
          width={100}
          alt='UPI'
          className='h-auto w-16 mr-1'
        />
      </div>
    </div>
  );
};

export default Card;
