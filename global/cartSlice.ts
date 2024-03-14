import { FormSchema } from '@/components/address';
import { Product, Summary } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

interface CartState {
  cartItems: Product[];
  paymentMethods: string[];
  address: z.infer<typeof FormSchema> | null;
  currentStep: number;
  summary: Summary;
  selectedMethod: 'upi' | 'card' | 'cod' | null;
}

const initialState: CartState = {
  cartItems: [],
  paymentMethods: [],
  address: null,
  currentStep: 2,
  summary: {
    orderAmount: 0,
    total: 0,
    deliveryCharges: 0,
    discountAmount: 0,
  },
  selectedMethod: null,
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
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setSummary: (state, action: PayloadAction<Summary>) => {
      state.summary = action.payload;
    },
    setPaymentMethod: (
      state,
      action: PayloadAction<'upi' | 'card' | 'cod'>
    ) => {
      state.selectedMethod = action.payload;
    },
  },
});

export const {
  setProducts,
  setPaymentMethods,
  addAddress,
  deleteAddress,
  setCurrentStep,
  setSummary,
  setPaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
