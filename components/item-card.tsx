import React from 'react';

interface ItemCardProps {
  image: string;
  title: string;
  quantity: number;
  price: number;
}

const ItemCard = ({ image, title, quantity, price }: ItemCardProps) => {
  return (
    <div className='flex gap-2 bg-white border'>
      <div className='w-32'>
        <img src={image} className='h-32 w-32 p-6' alt={title} />
      </div>

      <div className='w-[calc(100%-8rem)] p-2'>
        <h1 className='font-semibold line-clamp-2 text-sm'>{title}</h1>
        <p className='font-bold my-1'>₹{price}</p>

        <p className='text-gray-400 font-light text-sm'>Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default ItemCard;
