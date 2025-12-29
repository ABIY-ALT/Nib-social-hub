import type { Metadata } from 'next';
import './globals.css';
import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Social Hub',
  description: 'AI-Powered Social Media Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=PT+Sans:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="flex bg-gray-100 dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="p-6">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}