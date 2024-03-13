import React from 'react';
import ItemCard from './item-card';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import { PartyPopper } from 'lucide-react';

const OrderDetails = () => {
  const products = useSelector((state: RootState) => state.cart.cartItems);

  const orderAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const deliveryCharges = orderAmount * 0.02;

  const discountAmount = orderAmount * 0.07;
  const total = orderAmount - discountAmount + deliveryCharges;

  return (
    <>
      <div className='bg-white p-6 border'>
        <h1 className='uppercase font-bold text-xl mb-4'>Order Summary</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between text-sm'>
            <p>Order Amount</p>
            <p>₹{orderAmount.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Delivery Fee</p>
            <p>₹{deliveryCharges.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Discount</p>
            <p>- ₹{discountAmount.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-lg font-semibold mt-2'>
            <p className='flex items-start flex-col justify-center'>
              Total <br />
              <span className='text-gray-400 text-xs'>
                (Inclusive of all taxes)
              </span>
            </p>
            <p>₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className='p-4 bg-green-50 text-green-700 border border-green-500 flex items-center gap-1 mt-2 text-xs'>
        <PartyPopper className='h-4 w-4 mr-1' />
        Discount of <span className='font-bold'>8% Applied</span> for new users.
      </div>

      <hr className='my-5' />

      <div className='hidden lg:flex flex-col gap-3'>
        {products.map((product, index) => (
          <ItemCard
            key={product.id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            image={product.image}
          />
        ))}
      </div>
    </>
  );
};

export default OrderDetails;
