import Image from 'next/image';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import { Button } from './ui/button';

const UPIPayment = () => {
  const { selectedMethod } = useSelector((state: RootState) => state.cart);

  return (
    <div>
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

      {selectedMethod === 'upi' && (
        <div className='text-sm font-normal mt-3'>
          <p className='mb-2'>
            Make a selection on how you would like to use UPI.
          </p>
          <Tabs defaultValue='vpa'>
            <TabsList className='w-full'>
              <TabsTrigger className='w-1/2' value='vpa'>
                VPA
              </TabsTrigger>
              <TabsTrigger className='w-1/2' value='qr'>
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value='vpa'>
              <Label className='text-xs mb-1'>Virtual Payment Address</Label>
              <Input placeholder='mukulrajpoot@oksbi' className='my-1' />

              <Button type='submit' className='w-full mt-4'>
                Continue
              </Button>
            </TabsContent>

            <TabsContent
              value='qr'
              className='flex items-center flex-col justify-center border rounded-lg'
            >
              <Image
                src='/upi.svg'
                height={100}
                width={100}
                alt='UPI'
                className='h-auto w-16 my-10'
              />
              <p className='text-center mb-10 px-4'>
                Scan the QR code using your preferred UPI app to complete the
                payment
              </p>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
