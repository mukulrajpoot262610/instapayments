import { PartyPopper } from 'lucide-react';
import React from 'react';

const Discount = ({ discount }: { discount: number }) => {
  return (
    <div className='p-4 bg-green-50 text-green-700 border border-green-500 flex items-center gap-1 mt-2 text-xs'>
      <PartyPopper className='h-4 w-4 mr-1' />
      Discount of <span className='font-bold'>{discount}% Applied</span> for new
      users.
    </div>
  );
};

export default Discount;
