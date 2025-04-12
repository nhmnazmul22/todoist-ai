import Loader from '@/components/common/Loader';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Outlet, useNavigation } from 'react-router';

const RootLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading' && !navigation.formData;

  return (
    <div className='min-h-[100dvh] flex flex-col overflow-hidden'>
      <Header />
      <main className='grow grid grid-cols-1 items-center pt-36 pb-16'>
        <Outlet />
      </main>
      <Footer />

      {/* Loader */}
      {isLoading && <Loader />}
    </div>
  );
};

export default RootLayout;
