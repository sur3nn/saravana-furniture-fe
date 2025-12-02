'use client';

import '@/app/globals.css';
import 'antd/dist/reset.css';
import { Header } from '@/src/component/Header';
import { Footer } from 'antd/es/layout/layout';
import { Footers } from '@/src/component/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 w-full">
        
        {/* Fixed Header */}
        {/* <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
          <Header />
        </div> */}

        {/* Page Content */}
        <main className="pt-20 px-4 md:px-6 mt-10">
          {children}
        </main>

      </body>
    </html>
  );
}
