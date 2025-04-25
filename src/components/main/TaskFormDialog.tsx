import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TaskForm from '@/components/main/TaskForm';
import { TaskFormType } from '@/types';
import { startOfToday } from 'date-fns';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useFetcher, useLocation } from 'react-router';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const fetcher = useFetcher();

  const submitData = (formData: TaskFormType) => {
    fetcher.submit(JSON.stringify(formData), {
      method: 'POST',
      action: '/app',
      encType: 'application/json',
    });

    setOpen(false);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        const target = event.target as HTMLElement;
        if (target.localName === 'textarea') return;

        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

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
