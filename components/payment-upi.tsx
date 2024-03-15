import Image from 'next/image';
import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import { Button } from './ui/button';
import { checkStatus, getSession, makePayment } from '@/services/api-service';
import { PaymentApiPayload } from '@/types/cashfree';
import { Loader, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { setCurrentStep, setOrder, setOrderStatus } from '@/global/cartSlice';

const UPIPayment = () => {
  const dispatch = useDispatch();
  const { selectedMethod, address, summary } = useSelector(
    (state: RootState) => state.cart
  );

  const [upiId, setUpiId] = useState<string>('');
  const [qr, setQr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async (channel: string) => {
    if (!address) {
      return;
    }
    if (channel === 'collect' && !upiId) {
      return toast.error('Please enter a valid UPI Id.');
    }

    setLoading(true);

    try {
      const { data } = await getSession({
        address,
        summary,
        selectedMethod: 'upi',
      });

      const payload: PaymentApiPayload = {
        payment_session_id: data.paymentSessionId,
        upi_id: upiId,
        channel,
        method: 'upi',
      };

      const { data: paymentData } = await makePayment(payload);

      if (channel !== 'collect') {
        setLoading(false);
        setQr(paymentData.data.data.payload.qrcode);
      }

      const pollStatus = async () => {
        try {
          const { data: statusData } = await checkStatus(data.orderId!);
          console.log(statusData);
          if (statusData.data[0].payment_status === 'NOT_ATTEMPTED') {
            setTimeout(pollStatus, 5000);
          } else if (statusData.data[0].payment_status === 'SUCCESS') {
            dispatch(setOrderStatus('success'));
            setLoading(false);
            dispatch(setCurrentStep(4));
            dispatch(setOrder(statusData.data));
          } else {
            setLoading(false);
            toast.error(
              `${statusData.data[0].error_details.error_description}. Try Again.`
            );
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

  console.log(qr);

  return (
    <div className='p-4'>
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
              <TabsTrigger
                className='w-1/2'
                value='qr'
                onClick={() => handlePayment('qrcode')}
              >
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value='vpa'>
              <Label className='text-xs mb-1'>Virtual Payment Address</Label>
              <Input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder='mukulrajpoot@oksbi'
                className='my-1'
              />

              <Button
                type='submit'
                className='w-full mt-4'
                onClick={() => handlePayment('collect')}
              >
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
              <p className='text-center mb-5 px-4'>
                Scan the QR code using your preferred UPI app to complete the
                payment
              </p>
              {!loading ? (
                <>
                  {qr && <img src={qr} className='h-40 w-40' />}

                  {qr && (
                    <p className='flex items-center my-6 text-xl'>
                      <Loader2 className='mr-2 h-6 w-6 animate-spin' />
                      Waiting for payment
                    </p>
                  )}
                </>
              ) : (
                <Loader className='animate-spin mb-10' />
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
