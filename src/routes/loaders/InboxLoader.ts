import { database, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import { LoaderFunction } from 'react-router';

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    const userId = getUserId() as string;

    return await database.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', false),
      Query.isNull('project'),
      Query.equal('userId', userId),
    ]);
  } catch (err) {
    console.log(err);
  }
};

const InboxLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  console.log(tasks);
  return { tasks };
};

export default InboxLoader;
