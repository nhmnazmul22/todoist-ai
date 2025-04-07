import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
