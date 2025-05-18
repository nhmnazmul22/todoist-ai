import { truncateText } from '@/lib/utils';
import { Project } from '@/types';
import { Trash } from 'lucide-react';
import { useCallback } from 'react';
import { useFetcher } from 'react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const handleProjectDelete = useCallback(async () => {
    try {
      await fetcher.submit(defaultFormData, {
        method: 'DELETE',
        action: '/app/project',
        encType: 'application/json',
      });
    } catch (err) {
      console.log('Error deleting project', err);
    }
  }, [defaultFormData, fetcher]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-destructive w-full justify-start'
        >
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{truncateText(defaultFormData.name, 48)}</strong>{' '}
            project and all its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleProjectDelete}
            className='bg-red-600 hover:bg-red-500'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
