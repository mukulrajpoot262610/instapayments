'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ArrowBigRightDash } from 'lucide-react';

const FormSchema = z.object({
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

const Address = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className='bg-white p-6 border'>
      <h1 className='uppercase font-bold text-xl mb-4'>ADDRESS</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='First Name'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Last Name'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Street Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Street Address'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='landmark'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Landmark</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Landmark'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='First Name'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Last Name'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='City'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pincode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Pin Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Pin Code'
                      className='rounded-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='mobile'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Mobile Number'
                    className='rounded-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-xs'>
                  We will only call you if there are questions regarding your
                  order.
                </FormDescription>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <div className='pt-5'>
            <Button
              type='submit'
              className='w-full lg:w-1/3 flex items-center justify-between'
            >
              Next <ArrowBigRightDash className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Address;
