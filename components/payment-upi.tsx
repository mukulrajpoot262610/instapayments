import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
import UpiCard from './common/upi-card';
import UpiPaymentVpa from './payment-upi-vpa';
import UpiPaymentQr from './payment-upi-qr';

const UPIPayment = () => {
  const dispatch = useDispatch();
  const { selectedMethod, address, summary } = useSelector(
    (state: RootState) => state.cart
  );

  const [upiId, setUpiId] = useState<string>('');
  const [qr, setQr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading]);

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

  return (
    <div className='relative'>
      {loading && (
        <div className='h-full w-full absolute top-0 left-0 bg-black/[0.8] text-white flex flex-col items-center justify-center z-50'>
          <Loader2 className='animate-spin' />
          <p className='mt-2 font-normal'>Waiting for Payment</p>
          <p className='text-xs font-normal'>
            Please do not refresh or press back.
          </p>
          <p className='mt-4'>
            Waiting: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </p>
        </div>
      )}

      <div className='p-4 border hover:border-black'>
        <UpiCard />

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
                <UpiPaymentVpa setLoading={setLoading} />
              </TabsContent>

              <TabsContent
                value='qr'
                className='flex items-center flex-col justify-center border rounded-lg'
              >
                <UpiPaymentQr loading={loading} qr={qr} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
