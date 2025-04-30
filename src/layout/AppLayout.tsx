import AppSidebar from '@/components/layout/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { getUserId } from '@/lib/utils';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Outlet } from 'react-router';

const AppLayout = () => {
  const userId = getUserId();

  if (!userId) {
    window.location.href = '/auth-sync';
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <main className='flex-1'>
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>
      <Toaster />
    </>
  );
};

export default AppLayout;
