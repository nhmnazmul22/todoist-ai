// Node Modules
import { createBrowserRouter, RouteObject } from 'react-router';

// Application Root Layouts
import RootLayout from '@/layout/RootLayout';

// Application Pages
import AppLayout from '@/layout/AppLayout';
import AuthSyncPage from '@/pages/AuthSyncPage';
import HomePage from '@/pages/HomePage';
import InboxPage from '@/pages/InboxPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import RootErrorBoundary from '@/pages/RootErrorBoundary';

// Root Router Children Routes
const RootChildrenRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'auth-sync',
    element: <AuthSyncPage />,
  },
];

// App Route children route

const AppChildrenRoutes: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
  },
];

// Root Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: RootChildrenRoutes,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: AppChildrenRoutes,
  },
]);

export default router;
