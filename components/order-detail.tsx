import React from 'react';
import ItemCard from './item-card';
import { useSelector } from 'react-redux';
import { RootState } from '@/global/store';
import Discount from './common/discount';

const OrderDetails = () => {
  const { cartItems: products, summary } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <>
      <div className='bg-background p-6 border'>
        <h1 className='uppercase font-bold text-xl mb-4'>Order Summary</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between text-sm'>
            <p>Order Amount</p>
            <p>₹{summary.orderAmount.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Delivery Fee</p>
            <p>₹{summary.deliveryCharges.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Discount</p>
            <p>- ₹{summary.discountAmount.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-lg font-semibold mt-2'>
            <p className='flex items-start flex-col justify-center'>
              Total <br />
              <span className='text-gray-400 text-xs'>
                (Inclusive of all taxes)
              </span>
            </p>
            <p>₹{summary.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Discount discount={10} />

      <hr className='my-5' />

      <div className='flex flex-col gap-3'>
        {products.map((product) => (
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
