import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='min-h-[100dvh] flex flex-col overflow-hidden'>
      <Header />
      <main className='grow grid grid-cols-1 items-center pt-36 pb-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
