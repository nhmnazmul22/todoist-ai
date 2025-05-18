import { database, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getProjects = async () => {
  try {
    const userId = getUserId() as string;

    return await database.listDocuments(APPWRITE_DATABASE_ID, 'projects', [
      Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
    ]);
  } catch (err) {
    console.log(err);
    throw new Error('Error getting project list');
  }
};

const projectLoader = async () => {
  const projects = await getProjects();

  return { projects };
};

export default projectLoader;
