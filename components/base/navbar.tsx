import { CircleCheck, Moon, ShoppingCartIcon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const { setTheme } = useTheme();
  const { cartItems: products, currentStep } = useSelector(
    (state: RootState) => state.cart
  );
  const { merchantLogo, merchantName, theme } = useSelector(
    (state: RootState) => state.merchant
  );

  return (
    <div className='mr-4 border-b fixed w-full z-50 h-24 bg-background flex flex-col justify-center'>
      <div className='max-w-6xl mx-auto flex items-center justify-between w-full px-6'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <Image
            src={merchantLogo}
            height={100}
            width={100}
            alt='Logo'
            className='h-8 w-8'
          />
          <p className='text-xs font-bold'>{merchantName}</p>
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant='ghost' className='relative'>
            <span className='absolute h-5 w-5 bg-blue-500 rounded-full hidden md:flex items-center justify-center text-xs font-bold top-0 right-1 text-background'>
              {products.length}
            </span>
            <ShoppingCartIcon className='h-6 w-6' />
          </Button>
        </div>
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
                : 'bg-foreground text-background'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 1 ? (
              <CircleCheck className='text-background' />
            ) : (
              '1'
            )}
          </p>
          <p
            className={`${
              currentStep > 1 ? 'text-green-500' : ''
            } uppercase text-xs`}
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
                : 'bg-foreground text-background'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 2 ? (
              <CircleCheck className='text-background' />
            ) : (
              '2'
            )}
          </p>
          <p
            className={`${
              currentStep > 2 ? 'text-green-500' : ''
            } uppercase text-xs`}
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
                : 'bg-foreground text-background'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 3 ? (
              <CircleCheck className='text-background' />
            ) : (
              '3'
            )}
          </p>
          <p
            className={`${
              currentStep > 3 ? 'text-green-500' : ''
            } uppercase text-xs`}
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
                : 'bg-foreground text-background'
            }  rounded-full hidden md:flex items-center justify-center text-xs`}
          >
            {currentStep > 4 ? (
              <CircleCheck className='text-background' />
            ) : (
              '4'
            )}
          </p>
          <p
            className={`${
              currentStep > 4 ? 'text-green-500' : ''
            } uppercase text-xs`}
          >
            Order Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
