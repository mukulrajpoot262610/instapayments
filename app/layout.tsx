/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/base/navbar';
import { Provider } from 'react-redux';
import { store } from '@/global/store';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <script src='https://sdk.cashfree.com/js/v3/cashfree.js'></script>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main className='pt-20 bg-muted'>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
