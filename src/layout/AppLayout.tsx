import AppSidebar from '@/components/layout/AppSideBar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <main className='flex-1'>
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
