import Kbd from '@/components/common/Kbd';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Types
type TopAppBarProps = {
  title: string;
  taskCount?: number;
};

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70);

    listener();
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-40 h-14 grid grid-cols-[40px_minmax(0,1fr)_40px] px-5 items-center',
        showTitle && 'border-b',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent className='flex items-center gap-1'>
          <p>Toggle Sidebar</p>
          <Kbd kbdText={'Ctrl + B'} />
        </TooltipContent>
      </Tooltip>
      <div
        className={cn(
          'max-w-[480px] mx-auto text-center transition-[transform_opacity]',
          showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        <h1 className='font-semibold truncate'>{title}</h1>
        <p className='text-xs text-muted-foreground'>{taskCount} tasks</p>
      </div>
    </div>
  );
};

export default TopAppBar;
