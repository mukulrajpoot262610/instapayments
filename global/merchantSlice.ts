import { FormSchema } from '@/schema/address-form';
import { Product, Summary } from '@/types/cart';
import { Theme } from '@/types/merchant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

interface MerchantData {
  theme: Theme;
  merchantName: string;
  merchantLogo: string;
}

const initialState: MerchantData = {
  theme: {
    '--background': 'hsl(20, 14.3%, 4.1%)',
    '--foreground': 'hsl(0, 0%, 95%)',
    '--primary': 'hsl(346.8, 77.2%, 49.8%)',
    '--primary-foreground': 'hsl(355.7, 100%, 97.3%)',
  },
  merchantName: 'GROWW',
  merchantLogo: 'https://groww.in/groww-logo-270.png',
};

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setMerchantData: (state, action: PayloadAction<MerchantData>) => {
      state.theme = action.payload.theme;
      state.merchantLogo = action.payload.merchantLogo;
      state.merchantName = action.payload.merchantName;
    },
  },
});

export const { setMerchantData } = merchantSlice.actions;

export default merchantSlice.reducer;
