// Node Modules
import { Link } from 'react-router';

// Components
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full p-4 z-[9999]'>
      <div className='container bg-background/75 h-16 rounded-xl flex items-center justify-between border backdrop-blur-3xl'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className=' flex items-center gap-2'>
          <Button
            asChild
            variant='ghost'
          >
            <Link to='/login'>Login</Link>
          </Button>
          <Button asChild>
            <Link to='/register'>Free Trial</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
