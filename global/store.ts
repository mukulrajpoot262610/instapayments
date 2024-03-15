import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import merchantSlice from './merchantSlice';

// Combine reducers
const rootReducer = {
  cart: cartSlice,
  merchant: merchantSlice,
};

// Define the store type
export const store = configureStore({
  reducer: rootReducer,
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
