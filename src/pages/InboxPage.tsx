import Head from '@/components/common/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/main/Page';
import TaskCreateButton from '@/components/main/TaskCreateButton';
import TaskEmptyState from '@/components/main/TaskEmptyState';
import TaskForm from '@/components/main/TaskForm';
import TopAppBar from '@/components/main/TopAppBar';
import { TaskFormType } from '@/types';
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

const InboxPage = () => {
  const fetcher = useFetcher();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { tasks } = useLoaderData();
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
