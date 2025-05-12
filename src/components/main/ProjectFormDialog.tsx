import { Project, ProjectForm } from '@/types';
import { useState } from 'react';
import { useFetcher } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import FormProject from './ProjectForm';

type ProjectFormDialogType = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

const ProjectFormDialog: React.FC<ProjectFormDialogType> = ({
  defaultFormData,
  children,
  method,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const fetcher = useFetcher();

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    >
      <DialogTitle></DialogTitle>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className='px-0 py-0'
        aria-describedby={undefined}
      >
        <FormProject
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setDialogOpen(false)}
          onSubmit={async (formData: ProjectForm) => {
            setDialogOpen(false);
            await fetcher.submit(JSON.stringify(formData), {
              method,
              action: '/app/project',
              encType: 'application/json',
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
