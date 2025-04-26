import { CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';

type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add Task
    </Button>
  );
};

export default TaskCreateButton;
