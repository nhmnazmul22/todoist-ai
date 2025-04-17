import AppSidebar from '@/components/layout/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider >
        <AppSidebar />
        <SidebarTrigger />
        <div>App Layout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
