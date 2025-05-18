import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project } from '@/types';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Edit } from 'lucide-react';
import ProjectDeleteButton from './ProjectDeleteButton';
import ProjectFormDialog from './ProjectFormDialog';

interface ActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant='ghost'
              className='w-full justify-start'
              size='sm'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
