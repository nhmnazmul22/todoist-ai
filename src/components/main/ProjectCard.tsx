import { Models } from 'appwrite';
import { Hash, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import ActionMenu from './ActionMenu';

// Type
type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className='relative flex gap-3 items-center h-12 px-2 group/card rounded-md hover:bg-secondary'>
      <Hash
        size={16}
        color={project.color_hex}
        className='shrink-0'
      />
      <p className='text-sm truncate max-w-[46ch]'>{project.name}</p>

      {/* Action Menu */}
      <ActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_hex: project.color_hex,
          color_name: project.color_name,
        }}
      >
        <Button
          variant='ghost'
          className='shrink-0 ms-auto opacity-0 group-hover/card:opacity-100 max-md:opacity-100 z-20 '
        >
          <MoreHorizontal />
        </Button>
      </ActionMenu>
      <Link
        to={`/app/project/${project.$id}`}
        className='absolute inset-0 z-10 top-0 left-0'
      />
    </div>
  );
};

export default ProjectCard;
