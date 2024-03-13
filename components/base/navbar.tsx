import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';

const Navbar = () => {
  const products = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <div className='mr-4 border-b fixed w-full z-50 h-20 flex items-center bg-white'>
      <div className='max-w-6xl mx-auto flex items-center justify-between w-full px-6'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <Image
            src='https://groww.in/groww-logo-270.png'
            height={100}
            width={100}
            alt='Logo'
            className='h-8 w-8'
          />
        </Link>
        <Button variant='ghost' className='relative'>
          <span className='absolute h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold top-0 right-1 text-white'>
            {products.length}
          </span>
          <ShoppingCartIcon className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
