import Head from '@/components/common/Head';
import { SignUp } from '@clerk/clerk-react';

const RegisterPage = () => {
  return (
    <>
      <Head title='Create an account - Your AI Task Assistant' />
      <section className=''>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
