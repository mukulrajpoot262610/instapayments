import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import toast from 'react-hot-toast';
import { checkStatus, getSession, makePayment } from '@/services/api-service';
import { PaymentApiPayload } from '@/types/cashfree';
import { setCurrentStep, setOrder, setOrderStatus } from '@/global/cartSlice';
import { LockIcon } from 'lucide-react';

const UpiPaymentVpa = ({
  setLoading,
}: {
  setLoading: (value: boolean) => void;
}) => {
  const [upiId, setUpiId] = useState<string>();

  const dispatch = useDispatch();
  const { address, summary } = useSelector((state: RootState) => state.cart);

  const handlePayment = async () => {
    if (!address) {
      return;
    }
    if (!upiId) {
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
        channel: 'collect',
        method: 'upi',
      };

      const { data: paymentData } = await makePayment(payload);

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
    <div className='relative'>
      <Label className='text-xs mb-1'>Virtual Payment Address</Label>
      <Input
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder='mukulrajpoot@oksbi'
        className='my-1'
      />

      <Button onClick={handlePayment} className='w-full'>
        Pay Now <LockIcon className='h-4 w-4 ml-3' />
      </Button>
    </div>
  );
};

export default UpiPaymentVpa;
