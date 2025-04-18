import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '@/components/ui/TaskForm';
import { PropsWithChildren } from 'react';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0'>
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
