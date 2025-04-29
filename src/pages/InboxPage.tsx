import Head from '@/components/common/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/main/Page';
import TaskCard from '@/components/main/TaskCard';
import TaskCreateButton from '@/components/main/TaskCreateButton';
import TaskEmptyState from '@/components/main/TaskEmptyState';
import TaskForm from '@/components/main/TaskForm';
import TopAppBar from '@/components/main/TopAppBar';
import { TaskFormType } from '@/types';
import { Models } from 'appwrite';
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

const InboxPage = () => {
  const fetcher = useFetcher();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();
  console.log(tasks);
  const handleTaskFormSubmit = (formData: TaskFormType) => {
    fetcher.submit(JSON.stringify(formData), {
      action: '/app',
      method: 'POST',
      encType: 'application/json',
    });
  };

  return (
    <>
      <Head title='Todoist AI - Inbox' />
      <TopAppBar
        title='Inbox'
        taskCount={20}
      />
      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>
        <PageList>
          {tasks.total > 0 &&
            tasks.documents.map(
              ({ $id, content, completed, due_date, projectId }) => (
                <TaskCard
                  key={$id}
                  id={$id}
                  content={content}
                  completed={completed}
                  dueDate={due_date}
                  project={projectId}
                />
              ),
            )}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}
          {!showTaskForm && <TaskEmptyState type='inbox' />}
          {showTaskForm && (
            <TaskForm
              mode='create'
              className='mt-1'
              onCancel={() => setShowTaskForm(false)}
              onSubmit={handleTaskFormSubmit}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default InboxPage;
