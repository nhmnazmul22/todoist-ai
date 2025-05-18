import AppSidebar from '@/components/layout/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { cn, getUserId } from '@/lib/utils';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Outlet, useNavigation } from 'react-router';

const AppLayout = () => {
  const userId = getUserId();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading' && !navigation.formData;

  if (!userId) {
    window.location.href = '/auth-sync';
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <main
            className={cn(
              'flex-1',
              isLoading && 'opacity-50 pointer-event-none',
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>
      <Toaster />
    </>
  );
};

export default AppLayout;
