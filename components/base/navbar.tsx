import {
  CheckCircle2,
  CircleCheck,
  CreditCard,
  ShoppingCartIcon,
  TruckIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';

const Navbar = () => {
  const { cartItems: products, currentStep } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className='mr-4 border-b fixed w-full z-50 h-24 bg-white flex flex-col justify-center'>
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
          <span className='absolute h-5 w-5 bg-blue-500 rounded-full hidden md:flex items-center justify-center text-xs font-bold top-0 right-1 text-white'>
            {products.length}
          </span>
          <ShoppingCartIcon className='h-6 w-6' />
        </Button>
      </div>

      <div className='max-w-6xl mx-auto flex items-center gap-4 mt-2'>
        <div
          className={`items-center flex gap-1 ${
            currentStep > 1 ? 'font-semibold' : 'font-light text-gray-500'
          }`}
        >
          <p
            className={`h-6 w-6 ${
              currentStep > 1
                ? 'bg-green-500 text-green-500'
                : 'bg-black text-white'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 1 ? <CircleCheck className='text-white' /> : '1'}
          </p>
          <p
            className={`${
              currentStep > 1 ? 'text-green-500' : ''
            } uppercase text-sm`}
          >
            Bag
          </p>
        </div>
        <div
          className={`flex items-center gap-1 ${
            currentStep > 1 ? 'font-semibold' : 'font-light text-gray-500'
          }`}
        >
          <p
            className={`h-6 w-6 ${
              currentStep > 2
                ? 'bg-green-500 text-green-500'
                : 'bg-black text-white'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 2 ? <CircleCheck className='text-white' /> : '2'}
          </p>
          <p
            className={`${
              currentStep > 2 ? 'text-green-500' : ''
            } uppercase text-sm`}
          >
            Delivery
          </p>
        </div>
        <div
          className={`flex items-center gap-1 ${
            currentStep > 2 ? 'font-semibold' : 'font-light text-gray-500'
          }`}
        >
          <p
            className={`h-6 w-6 ${
              currentStep > 3
                ? 'bg-green-500 text-green-500'
                : 'bg-black text-white'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 3 ? <CircleCheck className='text-white' /> : '3'}
          </p>
          <p
            className={`${
              currentStep > 3 ? 'text-green-500' : ''
            } uppercase text-sm`}
          >
            Payment
          </p>
        </div>
        <div
          className={`flex items-center gap-1 ${
            currentStep > 4 ? 'font-semibold' : 'font-light text-gray-500'
          }`}
        >
          <p
            className={`h-6 w-6 ${
              currentStep > 4
                ? 'bg-green-500 text-green-500'
                : 'bg-black text-white'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 4 ? <CircleCheck className='text-white' /> : '4'}
          </p>
          <p
            className={`${
              currentStep > 4 ? 'text-green-500' : ''
            } uppercase text-sm`}
          >
            Order Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
