import React from 'react';
import ItemCard from './item-card';

const PRODUCTS = [
  {
    id: 14,
    title:
      'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED',
    price: 999.99,
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    quantity: 8,
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    quantity: 8,
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    quantity: 10,
  },
];

const OrderDetails = () => {
  return (
    <>
      <div className='bg-white p-6 border'>
        <h1 className='uppercase font-bold text-xl mb-4'>Order Summary</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between text-sm'>
            <p>Order Amount</p>
            <p>17,490</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Delivery Fee</p>
            <p>10</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p>Discount</p>
            <p>100</p>
          </div>
          <div className='flex items-center justify-between text-lg font-semibold mt-2'>
            <p className='flex items-start flex-col justify-center'>
              Total <br />
              <span className='text-gray-400 text-xs'>
                (Inclusive of all taxes)
              </span>
            </p>
            <p>100</p>
          </div>
        </div>
      </div>

      <hr className='my-5' />

      <div className='hidden lg:flex flex-col gap-3'>
        {PRODUCTS.map((product, index) => (
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
