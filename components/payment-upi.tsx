import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import { checkStatus, getSession, makePayment } from '@/services/api-service';
import { PaymentApiPayload } from '@/types/cashfree';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { setCurrentStep, setOrder, setOrderStatus } from '@/global/cartSlice';
import UpiCard from './common/upi-card';
import UpiPaymentVpa from './payment-upi-vpa';
import UpiPaymentQr from './payment-upi-qr';
import Image from 'next/image';

const UPIPayment = () => {
  const dispatch = useDispatch();
  const { selectedMethod, address, summary, orderStatus } = useSelector(
    (state: RootState) => state.cart
  );

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

    setLoading(true);
    dispatch(setOrderStatus('pending'));

    try {
      const { data } = await getSession({
        address,
        summary,
        selectedMethod: 'upi',
      });

      const payload: PaymentApiPayload = {
        payment_session_id: data.paymentSessionId,
        channel,
        method: 'upi',
      };

      const { data: paymentData } = await makePayment(payload);

      setLoading(false);
      setQr(paymentData.data.data.payload.qrcode);

      const pollStatus = async () => {
        try {
          const { data: statusData } = await checkStatus(data.orderId!);
          if (statusData.data[0].payment_status === 'NOT_ATTEMPTED') {
            dispatch(setOrderStatus('pending'));
            setTimeout(pollStatus, 5000);
          } else if (statusData.data[0].payment_status === 'SUCCESS') {
            setLoading(true);
            dispatch(setOrderStatus('success'));
            setTimeout(() => dispatch(setCurrentStep(4)), 3000);
            dispatch(setOrder(statusData.data));
          } else {
            setLoading(true);
            dispatch(setOrderStatus('failure'));
            setTimeout(() => setLoading(false), 3000);
            setQr('');
            toast.error(
              `${statusData.data[0].error_details.error_description}`
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
        <div className='h-screen w-full fixed top-0 left-0 bg-black/[0.8] text-white flex flex-col items-center justify-center z-50'>
          {orderStatus === 'failure' ? (
            <>
              <Image src='/failure.gif' height={200} width={200} alt='' />
              <p className='mt-2 font-normal'>Payment Failed</p>
              <p className='text-xs font-normal'>
                Please try again in some time.
              </p>
            </>
          ) : orderStatus === 'success' ? (
            <>
              <Image src='/success.gif' height={200} width={200} alt='' />
              <p className='mt-2 font-normal'>Payment Success</p>
              <p className='text-xs font-normal flex items-center gap-2'>
                redirecting <Loader2 className='h-3 w-3 animate-spin' />
              </p>
            </>
          ) : (
            <>
              <Loader2 className='animate-spin' />
              <p className='mt-2 font-normal'>Waiting for Payment</p>
              <p className='text-xs font-normal'>
                Please do not refresh or press back.
              </p>
              <p className='mt-4'>
                Waiting: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </>
          )}
        </div>
      )}

      <div className='p-4 border hover:border-foreground'>
        <UpiCard />

        {selectedMethod === 'upi' && (
          <div className='text-sm font-normal mt-3'>
            <p className='mb-2'>
              Make a selection on how you would like to use UPI.
            </p>
            <Tabs defaultValue='vpa'>
              <TabsList className='w-full'>
                <TabsTrigger
                  className='w-1/2'
                  value='vpa'
                  disabled={loading && !qr}
                >
                  VPA
                </TabsTrigger>
                <TabsTrigger
                  className='w-1/2'
                  value='qr'
                  disabled={loading}
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
                <UpiPaymentQr
                  loading={loading}
                  qr={qr}
                  handlePayment={handlePayment}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
