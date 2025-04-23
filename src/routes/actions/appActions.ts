import { database } from '@/lib/appwrite';
import { generateId, getUserId } from '@/lib/utils';
import { Task } from '@/types';
import { ActionFunction, redirect } from 'react-router';

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createTask = async (data: Task) => {
  try {
    const documentId = generateId();
    const userId = getUserId();
    
    if (!userId) {
      return redirect('/login');
    }

    return await database.createDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      documentId,
      {
        ...data,
        userId: userId,
      },
    );
  } catch (err) {
    console.log(err);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === 'POST') {
    return await createTask(data);
  }
};

export default appAction;
