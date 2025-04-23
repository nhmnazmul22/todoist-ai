import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '@/components/ui/TaskForm';
import { Task } from '@/types';
import { startOfToday } from 'date-fns';
import { PropsWithChildren, useState } from 'react';
import { useFetcher, useLocation } from 'react-router';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const fetcher = useFetcher();

  const submitData = (formData: Task) => {
    fetcher.submit(JSON.stringify(formData), {
      method: 'POST',
      action: '/app',
      encType: 'application/json',
    });

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0'>
        <TaskForm
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            projectId: null,
          }}
          mode='create'
          className=''
          onCancel={() => setOpen(false)}
          onSubmit={submitData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
