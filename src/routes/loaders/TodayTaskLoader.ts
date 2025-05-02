import { database, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { LoaderFunction } from 'react-router';

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    const userId = getUserId() as string;

    return await database.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', false),
      Query.and([
        Query.greaterThanEqual('due_date', startOfToday().toISOString()),
        Query.lessThan('due_date', startOfTomorrow().toISOString()),
      ]),
      Query.equal('userId', userId),
    ]);
  } catch (err) {
    console.log(err);
  }
};

const TodayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default TodayTaskLoader;
