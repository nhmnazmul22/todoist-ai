import Head from '@/components/common/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/main/Page';
import TaskCard from '@/components/main/TaskCard';
import TaskEmptyState from '@/components/main/TaskEmptyState';
import TopAppBar from '@/components/main/TopAppBar';
import { Models } from 'appwrite';
import { CheckCircle2 } from 'lucide-react';
import { useLoaderData } from 'react-router';

const UpcomingPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Todoist AI - Upcoming' />
      <TopAppBar
        title='Upcoming'
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Upcoming</PageTitle>
          {tasks.total > 0 && (
            <div className='flex gap-2 text-sm items-center text-muted-foreground'>
              <CheckCircle2 size={16} /> {tasks.total} task
            </div>
          )}
        </PageHeader>
        <PageList>
          {tasks.total > 0 &&
            tasks.documents.map(
              ({ $id, content, completed, due_date, project }) => (
                <TaskCard
                  key={$id}
                  id={$id}
                  content={content}
                  completed={completed}
                  dueDate={due_date}
                  project={project}
                />
              ),
            )}

          {!tasks.total && <TaskEmptyState type='upcoming' />}
        </PageList>
      </Page>
    </>
  );
};

export default UpcomingPage;
