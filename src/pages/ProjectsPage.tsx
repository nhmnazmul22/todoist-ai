import Head from '@/components/common/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/main/Page';
import ProjectCard from '@/components/main/ProjectCard';
import ProjectFormDialog from '@/components/main/ProjectFormDialog';
import TopAppBar from '@/components/main/TopAppBar';
import { Button } from '@/components/ui/button';
import { Models } from 'appwrite';
import { Plus } from 'lucide-react';
import { useLoaderData } from 'react-router';

// Type
type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;
  const { projects } = loaderData;

  return (
    <>
      <Head title='My Project - Todoist AI' />
      <TopAppBar
        title='My Project'
        taskCount={projects.total}
      />
      <Page>
        <PageHeader>
          <div className='flex gap-2 items-center'>
            <PageTitle>My Project</PageTitle>
            <ProjectFormDialog method='POST'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                aria-label='Create a Project'
              >
                <Plus />
              </Button>
            </ProjectFormDialog>
          </div>
        </PageHeader>
        <PageList>
          <div className='flex items-center h-8 border-b'>
            <div className='text-sm text-muted-foreground'>
              {projects.total} Projects
            </div>
          </div>
          <div className='mt-3'>
            {projects.documents.map((project) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}
          </div>
        </PageList>
      </Page>
    </>
  );
};

export default ProjectsPage;
