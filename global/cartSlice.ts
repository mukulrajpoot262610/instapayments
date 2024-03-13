import { FormSchema } from '@/components/address';
import { Product } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

interface CartState {
  cartItems: Product[];
  paymentMethods: string[];
  address: z.infer<typeof FormSchema> | null;
  currentStep: 'shipping' | 'payment' | 'final';
}

const initialState: CartState = {
  cartItems: [],
  paymentMethods: [],
  address: null,
  currentStep: 'shipping',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.cartItems = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<string[]>) => {
      state.paymentMethods = action.payload;
    },
    addAddress: (state, action: PayloadAction<z.infer<typeof FormSchema>>) => {
      state.address = action.payload;
    },
    deleteAddress: (state) => {
      state.address = null;
    },
    setCurrentStep: (
      state,
      action: PayloadAction<'shipping' | 'payment' | 'final'>
    ) => {
      state.currentStep = action.payload;
    },
  },
});

export const {
  setProducts,
  setPaymentMethods,
  addAddress,
  deleteAddress,
  setCurrentStep,
} = cartSlice.actions;

export default cartSlice.reducer;
