import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
import { Loader, Loader2, LockIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import { checkStatus, getSession, makePayment } from '@/services/api-service';
import { PaymentApiPayload } from '@/types/cashfree';
import { setCurrentStep, setOrder, setOrderStatus } from '@/global/cartSlice';
import toast from 'react-hot-toast';

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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
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
          console.log(statusData);
          if (statusData.data.order_status !== 'PAID') {
            setTimeout(pollStatus, 5000);
          } else {
            dispatch(setOrderStatus('success'));
            setLoading(false);
            dispatch(setCurrentStep(4));
            dispatch(setOrder(statusData.data));
          }
        } catch (err) {
          console.log('Error while polling status:', err);
        }
      };

      setTimeout(pollStatus, 5000);
    } catch (err) {
      console.log(err);
      toast.error('Internal Server Error');
      setLoading(false);
    }
  };

  const { selectedMethod } = useSelector((state: RootState) => state.cart);

  return (
    <div className='relative p-4'>
      {loading && (
        <div className='h-full w-full absolute top-0 left-0 bg-black/[0.5] text-white flex flex-col items-center justify-center'>
          <Loader2 className='animate-spin' />
          <p className='mt-2 font-normal'>Processing</p>
          <p className='text-xs font-normal'>
            Please do not refresh or press back.
          </p>
        </div>
      )}

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
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading && <Loader className='h-4 w-4 mr-3 animate-spin' />}
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
