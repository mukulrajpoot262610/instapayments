import { FormSchema } from '@/components/address';
import { PaymentMethods, Product } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

interface CartState {
  cartItems: Product[];
  paymentMethods: PaymentMethods[];
  address: z.infer<typeof FormSchema> | null;
}

const initialState: CartState = {
  cartItems: [],
  paymentMethods: [],
  address: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.cartItems = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<PaymentMethods[]>) => {
      state.paymentMethods = action.payload;
    },
    addAddress: (state, action: PayloadAction<z.infer<typeof FormSchema>>) => {
      state.address = action.payload;
    },
    deleteAddress: (state) => {
      state.address = null;
    },
  },
});

export const { setProducts, setPaymentMethods, addAddress, deleteAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
