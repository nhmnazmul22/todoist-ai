import { heroBannerLg, heroBannerSm } from '@/assets';
import Head from '@/components/common/Head';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <>
      <Head title='Todoist AI- Your AI Task Assistant' />
      <section>
        <div className='container !px-8 grid grid-cols-1 gap-8 items-center xl:grid-cols-[1fr_1.5fr]'>
          <div className='flex flex-col items-center text-center space-y-5 lg:items-start lg:text-left'>
            <h1 className='text-4xl md:text-5xl lg:6xl xl:5xl 2xl:text-6xl font-semibold max-w-[22ch]'>
              A Smarter Way to Get Things Done.
              <span className='inline-flex bg-gradient-to-t from-primary/50 to-primary/20 rounded-full px-2 overflow-hidden'>
                AI-powered
              </span>
              task management that just works.
            </h1>
            <p className='text-base text-foreground/60'>
              Simple, elegant task management—boosted by the power of artificial
              intelligence.
            </p>
            <Button
              asChild
              size='lg'
            >
              <Link to='/register'>Free Trial</Link>
            </Button>
          </div>
          <figure className='bg-secondary rounded-2xl overflow-hidden aspect-square md:aspect-video max-md:max-w-[480px] max-md:mx-auto'>
            <img
              src={heroBannerSm}
              width={480}
              height={480}
              alt='Hero Banner'
              className='md:hidden'
            />
            <img
              src={heroBannerLg}
              width={960}
              height={540}
              alt='Hero Banner'
              className='max-md:hidden'
            />
          </figure>
        </div>
      </section>
    </>
  );
};

export default HomePage;
