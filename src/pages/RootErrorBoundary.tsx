import { pageNotFound } from '@/assets';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className='min-h-[100dvh] flex flex-col'>
      <Header />
      <div className='grow container flex flex-col items-center justify-center text-center pb-16 pt-32'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-semibold'>
          {isRouteErrorResponse(error)
            ? 'Oops! Page Not Found'
            : 'Oops! Something went wrong!'}
        </h1>
        <p className='text-base max-w-[56ch] mt-5 mb-6 lg:text-lg text-foreground/70'>
          {isRouteErrorResponse(error)
            ? 'The page you’re looking for doesn’t exist, was moved, or never existed at all.'
            : 'Try refreshing the page, checking your internet connection, or coming back later.'}
        </p>
        <div className='flex gap-3'>
          <Button asChild>
            <Link to='/'>Return to Home</Link>
          </Button>
          <Button
            asChild
            variant='ghost'
          >
            <Link to='/'>Contact Us</Link>
          </Button>
        </div>
        <figure className='mt-10'>
          <img
            src={pageNotFound}
            alt='Page not found'
            width={560}
            height={3}
          />
        </figure>
      </div>
      <Footer />
    </div>
  );
};

export default RootErrorBoundary;
