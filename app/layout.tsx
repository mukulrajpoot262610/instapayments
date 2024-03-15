'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/base/navbar';
import { Provider } from 'react-redux';
import { store } from '@/global/store';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <title>InstaPayments</title>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <Navbar />
            <main className='pt-20 bg-muted'>{children}</main>
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
