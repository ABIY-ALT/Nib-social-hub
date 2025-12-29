import AppHeader from '@/components/layout/header';
import AppSidebar from '@/components/layout/sidebar';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import FirebaseClientProvider from '@/firebase/client-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
