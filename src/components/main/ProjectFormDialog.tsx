import { truncateText } from '@/lib/utils';
import { Project, ProjectForm } from '@/types';
import { useState } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
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
      <DialogTrigger asChild>{children}</DialogTrigger>
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

            toast(
              `Project is ${method === 'POST' ? 'Creating...' : 'Updating...'}`,
            );
            await fetcher.submit(JSON.stringify(formData), {
              method,
              action: '/app/project',
              encType: 'application/json',
            });
            toast(`Project is ${method === 'POST' ? 'Created' : 'Updated'}`, {
              description: `The project ${truncateText(formData.name, 32)} and its tasks ${method === 'POST' ? 'created' : 'updated'} successfully `,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
