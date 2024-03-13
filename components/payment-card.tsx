import Image from 'next/image';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LockIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';

const CardSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: 'Enter a valid card number.',
  }),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, {
    message: 'Enter expiry Date.',
  }),
  cvv: z.string().regex(/^\d{3}$/, {
    message: 'Enter CVV/CVC.',
  }),
});

const CardPayment = () => {
  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof CardSchema>) {}

  const { selectedMethod } = useSelector((state: RootState) => state.cart);

  return (
    <div>
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
      {selectedMethod === 'card' && (
        <div className='text-sm font-normal mt-3'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-2'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Name on card</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder='1234 4567 8912 3456' {...field} />
                    </FormControl>
                    <FormDescription className='p-1'>
                      <div className='flex items-center gap-1'>
                        <Image
                          src='/master-card.svg'
                          height={100}
                          width={100}
                          alt='UPI'
                          className='h-3 w-auto mr-1'
                        />
                        <Image
                          src='/visa.svg'
                          height={100}
                          width={100}
                          alt='UPI'
                          className='h-2 w-auto mr-1'
                        />
                        <Image
                          src='/rupay.svg'
                          height={100}
                          width={100}
                          alt='UPI'
                          className='h-3 w-auto mr-1'
                        />
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex items-center w-full space-x-4'>
                <FormField
                  control={form.control}
                  name='expiryDate'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='text-xs'>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder='MM/YY' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cvv'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='text-xs'>CVV / CVC</FormLabel>
                      <FormControl>
                        <Input placeholder='3 Digits' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='pt-5'>
                <Button type='submit' className='w-full'>
                  Pay Now <LockIcon className='h-4 w-4 ml-3' />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CardPayment;
