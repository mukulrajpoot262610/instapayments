import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

// Combine reducers
const rootReducer = {
  cart: cartSlice,
};

// Define the store type
export const store = configureStore({
  reducer: rootReducer,
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
