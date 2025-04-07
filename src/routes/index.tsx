// Node Modules
import { createBrowserRouter } from 'react-router';

// Application Root Layouts
import RootLayout from '@/layout/RootLayout';

// Application Pages
import HomePage from '@/pages/HomePage';

// Root Router Children Routes
const RootChildrenRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
];

// Root Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: RootChildrenRoutes,
  },
]);

export default router;
