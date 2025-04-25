import Head from '@/components/common/Head';
import TopAppBar from '@/components/main/TopAppBar';

const InboxPage = () => {
  return (
    <>
      <Head title='Todoist AI - Inbox' />
      <TopAppBar
        title='Inbox'
        taskCount={20}
      />
      <div className='h-[400vh]'></div>
    </>
  );
};

export default InboxPage;
