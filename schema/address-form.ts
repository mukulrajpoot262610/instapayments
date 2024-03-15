import { z } from 'zod';

export const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  street: z.string().min(2, {
    message: 'Please enter your delivery address',
  }),
  landmark: z.string().min(2, {
    message: 'Please enter your delivery address',
  }),
  country: z.string().min(2, {
    message: 'Please select your country',
  }),
  state: z.string().min(2, {
    message: 'Please select your state',
  }),
  city: z.string().min(2, {
    message: 'Please enter your town or city.',
  }),
  pincode: z.string().min(2, {
    message: 'Please enter your pin code.',
  }),
  mobile: z.string().min(2, {
    message: 'Please enter your mobile number.',
  }),
});
