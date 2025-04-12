// Node Modules
import { createBrowserRouter } from 'react-router';

// Application Root Layouts
import RootLayout from '@/layout/RootLayout';

// Application Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import RootErrorBoundary from '@/pages/RootErrorBoundary';

// Root Router Children Routes
const RootChildrenRoutes = [
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
];

// Root Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: RootChildrenRoutes,
  },
]);

export default router;
