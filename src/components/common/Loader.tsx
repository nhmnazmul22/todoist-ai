import { logo } from '@/assets';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 bg-background h-[100dvh] w-full flex flex-col justify-center items-center gap-5'>
      <img
        src={logo}
        width={64}
        height={64}
        alt='Todoist AI'
      />
      <Loader2 className='animate-spin' />
    </div>
  );
};

export default Loader;
