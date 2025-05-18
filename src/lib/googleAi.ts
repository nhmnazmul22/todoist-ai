import { GoogleGenAI } from '@google/genai';

// Environment Variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateAiTask(prompt: string) {
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `
    Generate and return a list of task base on the provided prompt and given the JSON schema.
  
    Prompt: ${prompt}

    Task Schema: 
    {
    content: string; // Description of task
    due_date: Date | null; // Due date of task, or null if no specified due date is provided
    }

    Requirements: 
     1. Ensure tasks align with the provided prompt
     2. Set the due_date as an ISO 8601 formatted UTC string, calculated relative to today's date: ${new Date().toISOString()}
     3. Return an array of tasks matching the schema
    
     Output: Array<Task>
    `,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return response.text;
  } catch (err) {
    console.log('Error create Ai task', err);
  }
}

export default generateAiTask;
