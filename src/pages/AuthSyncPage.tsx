import Loader from '@/components/common/Loader';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthSyncPage = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Checking use signed or not
    if (!isSignedIn) {
      // Handle the localstorage item
      if (localStorage.getItem('ClerkUserId')) {
        localStorage.removeItem('ClerkUserId');
      }
      navigate('/');
      return;
    }

    // if user is singed save user id in localStorage and redirect the app
    if (isSignedIn) {
      localStorage.setItem('ClerkUserId', userId);
      navigate('/app/today');
      return;
    }
  }, [isLoaded, isSignedIn, userId, navigate]);

  return <Loader />;
};

export default AuthSyncPage;
