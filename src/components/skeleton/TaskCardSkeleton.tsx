import { Skeleton } from '../ui/skeleton';

const TaskCardSkeleton = () => {
  return (
    <div className='grid grid-cols-[max-content_1fr] items-center gap-3'>
      <Skeleton className='w-5 h-5 rounded-full' />
      <Skeleton className='h-3 me-15' />
    </div>
  );
};

export default TaskCardSkeleton;
