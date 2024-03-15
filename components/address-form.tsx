'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { FormSchema } from '@/schema/address-form';
import { addAddress } from '@/global/cartSlice';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowBigRightDash } from 'lucide-react';

const AddressForm = () => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: 'Mukul',
      lastName: 'Rajpoot',
      street: '3A Highland Park',
      landmark: 'Mohali Citi Square',
      city: 'Zirakpur',
      state: 'Punjab',
      pincode: '140603',
      country: 'India',
      mobile: '6392025617',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(addAddress(data));
    toast.success('Address Added');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-2'>
        <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='First Name'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Last Name'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='street'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs'>Street Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='Street Address'
                  className='rounded-none'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='landmark'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs'>Landmark</FormLabel>
              <FormControl>
                <Input
                  placeholder='Landmark'
                  className='rounded-none'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder='First Name'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>State</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Last Name'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder='City'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='pincode'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Pin Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Pin Code'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='mobile'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs'>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  placeholder='Mobile Number'
                  className='rounded-none'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-xs'>
                We will only call you if there are questions regarding your
                order.
              </FormDescription>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <div className='pt-5'>
          <Button
            type='submit'
            className='w-full lg:w-1/3 flex items-center justify-between'
          >
            Proceed <ArrowBigRightDash className='h-5 w-5' />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
