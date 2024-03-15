import { z } from 'zod';

export const CardSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: 'Enter a valid card number.',
  }),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, {
    message: 'Enter expiry Date in the format of MM/YY.',
  }),
  cvv: z.string().regex(/^\d{3}$/, {
    message: 'Enter CVV/CVC.',
  }),
});
