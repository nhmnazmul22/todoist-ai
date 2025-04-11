import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import './index.css';
import router from './routes';

// Environment Variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SING_IN_FORCE_URL = import.meta.env.VITE_CLERK_SING_IN_FORCE_URL;
const SING_UP_FORCE_URL = import.meta.env.VITE_CLERK_SING_UP_FORCE_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl='/auth-sync'
      signInForceRedirectUrl={SING_IN_FORCE_URL}
      signUpForceRedirectUrl={SING_UP_FORCE_URL}
      appearance={{
        baseTheme: dark,
      }}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
