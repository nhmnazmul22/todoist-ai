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

// Application actions
import CompletedPage from '@/pages/CompletedPage';
import TodayPage from '@/pages/TodayPage';
import UpcomingPage from '@/pages/UpcomingPage';
import AppAction from '@/routes/actions/appActions';
import CompletedLoader from './loaders/CompletedLoader';
import InboxLoader from './loaders/InboxLoader';
import TodayTaskLoader from './loaders/TodayTaskLoader';
import UpcomingLoader from './loaders/UpcomingLoader';

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
    loader: InboxLoader,
  },
  {
    path: 'today',
    element: <TodayPage />,
    loader: TodayTaskLoader,
  },
  {
    path: 'upcoming',
    element: <UpcomingPage />,
    loader: UpcomingLoader,
  },
  {
    path: 'completed',
    element: <CompletedPage />,
    loader: CompletedLoader,
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
    action: AppAction,
  },
]);

export default router;
