import Head from '@/components/common/Head';
import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <>
      <Head title='Login into your account - Your AI Task Assistant' />
      <section className=''>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
