import AppHeader from '@/components/layout/header';
import AppSidebar from '@/components/layout/sidebar';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import FirebaseClientProvider from '@/firebase/client-provider';
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
  title: 'Social Hub Dashboard',
  description: 'AI-Powered Social Media Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <FirebaseClientProvider>
          <SidebarProvider>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <SidebarInset>
              <AppHeader />
              <main className="p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
