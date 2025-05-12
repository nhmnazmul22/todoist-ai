import { database } from '@/lib/appwrite';
import { generateId, getUserId } from '@/lib/utils';
import { ProjectForm } from '@/types';
import { Models } from 'appwrite';
import { ActionFunction, redirect } from 'react-router';

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Create project
const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;

  try {
    const documentId = generateId();
    const userId = getUserId();

    if (!userId) {
      return redirect('/login');
    }

    project = await database.createDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: userId,
      },
    );
  } catch (err) {
    console.log('Error creating project', err);
  }

  return redirect(`/app/project/${project?.$id}`);
};

const projectActions: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as ProjectForm;

  if (request.method === 'POST') {
    return await createProject(data);
  }

  return null;
};

export default projectActions;
