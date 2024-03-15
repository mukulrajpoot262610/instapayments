import { Loader, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const UpiPaymentQr = ({ qr, loading }: { qr: string; loading: boolean }) => {
  return (
    <div>
      <Image
        src='/upi.svg'
        height={100}
        width={100}
        alt='UPI'
        className='h-auto w-16 my-10'
      />
      <p className='text-center mb-5 px-4'>
        Scan the QR code using your preferred UPI app to complete the payment
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
    </div>
  );
};

export default UpiPaymentQr;
