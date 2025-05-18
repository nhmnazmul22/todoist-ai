import { database } from '@/lib/appwrite';
import generateAiTask from '@/lib/googleAi';
import { generateId, getUserId } from '@/lib/utils';
import { Project, ProjectForm } from '@/types';
import { Models } from 'appwrite';
import { ActionFunction, redirect } from 'react-router';

// Types
type aiGenTaskType = {
  content: string;
  due_date: Date | null;
};

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Create project
const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;
  let aiGeneratedTasks: aiGenTaskType[] = [];

  try {
    const documentId = generateId();
    const userId = getUserId();
    const document = {
      name: data.name,
      color_name: data.color_name,
      color_hex: data.color_hex,
    };

    if (!userId) {
      return redirect('/login');
    }

    project = await database.createDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,
      {
        ...document,
        userId: userId,
      },
    );

    generateAiTask('');
  } catch (err) {
    console.log('Error creating project', err);
  }

  // Generate ai tasks
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse(
        (await generateAiTask(taskGenPrompt)) || '',
      );
      console.log(aiGeneratedTasks);
    } catch (err) {
      console.log(err);
    }
  }

  if (aiGeneratedTasks.length) {
    const promise = aiGeneratedTasks.map((task) => {
      return database.createDocument(
        APPWRITE_DATABASE_ID,
        'tasks',
        generateId(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId(),
        },
      );
    });

    try {
      await Promise.all(promise);
    } catch (err) {
      console.log('Error Create ai task', err);
    }
  }

  return redirect(`/app/project/${project?.$id}`);
};

const deleteProject = async (data: Project) => {
  const documentId = data.id;

  if(!documentId) throw new Error("Project not found!");

  try{
 
  }catch(err){
   console.log("Error")
  }


};

const projectActions: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as ProjectForm;

  if (request.method === 'POST') {
    return await createProject(data);
  }

  if (request.method === 'DELETE') {
    return await deleteProject(data);
  }

  return null;
};

export default projectActions;
