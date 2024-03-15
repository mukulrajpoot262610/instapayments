import { Fingerprint } from 'lucide-react';
import React from 'react';

const Alert = () => {
  return (
    <div className='p-2 lg:p-4 bg-blue-50 text-blue-700 border border-blue-500 flex items-center gap-1 mt-2 text-xs'>
      <Fingerprint className='h-4 w-4 mr-1' />
      Payments are SSL encrypted so that your credit card and payment details
      stay safe.
    </div>
  );
};

export default Alert;
