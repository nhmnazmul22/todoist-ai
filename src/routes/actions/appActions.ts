import { Task } from '@/types';
import { ActionFunction } from 'react-router';

const createTask = async (data: Task) => {
  try {
    console.log(data);
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
