import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { CardSchema } from '@/schema/card-form';
import { RootState } from '@/global/store';
import { checkStatus, getSession, makePayment } from '@/services/api-service';
import { PaymentApiPayload } from '@/types/cashfree';
import { setCurrentStep, setOrder, setOrderStatus } from '@/global/cartSlice';
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import Image from 'next/image';
import { LockIcon } from 'lucide-react';

const CardPaymentForm = ({
  setLoading,
}: {
  setLoading: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {},
  });

  const { address, summary } = useSelector((state: RootState) => state.cart);

  const handlePayment = async (cardData: z.infer<typeof CardSchema>) => {
    if (!address) {
      return;
    }

    setLoading(true);
    dispatch(setOrderStatus('pending'));

    try {
      const { data } = await getSession({
        address,
        summary,
        selectedMethod: 'cc, dc',
      });

      const payload: PaymentApiPayload = {
        payment_session_id: data.paymentSessionId,
        method: 'card',
        card_cvv: cardData.cvv,
        card_expiry_mm: cardData.expiryDate.split('/')[0],
        card_expiry_yy: cardData.expiryDate.split('/')[1],
        card_number: cardData.cardNumber,
        card_holder_name: cardData.name,
        channel: 'link',
      };

      const { data: paymentData } = await makePayment(payload);
      window.open(paymentData.data.data.url);

      const pollStatus = async () => {
        try {
          const { data: statusData } = await checkStatus(data.orderId!);
          if (statusData.data[0].payment_status === 'NOT_ATTEMPTED') {
            setTimeout(pollStatus, 5000);
            dispatch(setOrderStatus('pending'));
          } else if (statusData.data[0].payment_status === 'SUCCESS') {
            dispatch(setOrderStatus('success'));
            setTimeout(() => dispatch(setCurrentStep(4)), 3000);
            dispatch(setOrder(statusData.data));
          } else {
            dispatch(setOrderStatus('failure'));
            setTimeout(() => setLoading(false), 3000);
            toast.error(
              `${statusData.data[0].error_details.error_description}`
            );
          }
        } catch (err) {
          console.log('Error while polling status:', err);
        }
      };

      setTimeout(pollStatus, 5000);
    } catch (err: any) {
      toast.error(err.response.data.msg || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className='text-sm font-normal mt-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePayment)}
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
  );
};

export default CardPaymentForm;
