import Head from '@/components/common/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/main/Page';
import TaskCard from '@/components/main/TaskCard';
import TaskCreateButton from '@/components/main/TaskCreateButton';
import TaskEmptyState from '@/components/main/TaskEmptyState';
import TaskForm from '@/components/main/TaskForm';
import TopAppBar from '@/components/main/TopAppBar';
import TaskCardSkeleton from '@/components/skeleton/TaskCardSkeleton';
import { TaskFormType } from '@/types';
import { Models } from 'appwrite';
import { startOfToday } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

const TodayPage = () => {
  const fetcher = useFetcher();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  const handleTaskFormSubmit = (formData: TaskFormType) => {
    fetcher.submit(JSON.stringify(formData), {
      action: '/app',
      method: 'POST',
      encType: 'application/json',
    });
    setShowTaskForm(false);
  };

  return (
    <>
      <Head title='Today AI - Inbox' />
      <TopAppBar
        title='Today'
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>
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

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!tasks.total && !showTaskForm && <TaskEmptyState type='today' />}

          {showTaskForm && (
            <TaskForm
              mode='create'
              className='mt-1'
              defaultFormData={{
                content: '',
                due_date: startOfToday(),
                project: null,
              }}
              onCancel={() => setShowTaskForm(false)}
              onSubmit={handleTaskFormSubmit}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default TodayPage;
