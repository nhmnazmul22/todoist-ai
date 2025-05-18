// Assets
import { logo } from '@/assets';

const Logo = () => {
  return (
    <div className='flex items-center gap-3'>
      <img
        src={logo}
        alt='Todoist AI'
        className='w-6 h-6 object-cover'
      />
      <span className='text-base font-medium'>Todoist AI</span>
    </div>
  );
};

export default Logo;
