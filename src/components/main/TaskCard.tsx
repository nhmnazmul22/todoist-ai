import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn, formatDate, getDueDateColorClass } from '@/lib/utils';
import { Task, TaskFormType } from '@/types';
import { Models } from 'appwrite';
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TaskForm from './TaskForm';

type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  completed,
  dueDate,
  project,
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const fetcher = useFetcher();
  const fetcherTask = fetcher.json as Task;

  const task: Task = Object.assign(
    {
      id,
      content,
      completed,
      due_date: dueDate,
      project,
    },
    fetcherTask,
  );

  // Handle the task update form
  const handleTaskUpdateForm = (formDate: TaskFormType) => {
    fetcher.submit(JSON.stringify(formDate), {
      action: '/app',
      method: 'PUT',
      encType: 'application/json',
    });

    setShowTaskForm(false);
  };

  // Handle the task complete
  const handleTaskComplete = useCallback(
    async (complete: boolean) => {
      return await fetcher.submit(
        JSON.stringify({ id: task.id, completed: complete }),
        {
          action: '/app',
          method: 'PUT',
          encType: 'application/json',
        },
      );
    },
    [task.id, fetcher],
  );

  // Handle the delete task
  const handleDeleteTask = () => {
    fetcher.submit(JSON.stringify({ id: task.id }), {
      action: '/app',
      method: 'DELETE',
      encType: 'application/json',
    });
    toast('Task Delete Successful');
  };

  return (
    <>
      {!showTaskForm && (
        <div className='flex w-full gap-2 items-start relative group/card border-b border-foreground/10 my-2'>
          <Button
            variant='outline'
            size='icon'
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              task.completed && 'bg-border',
            )}
            role='checkbox'
            aria-checked={task.completed}
            aria-label={
              task.completed ? 'Task completed' : 'Task not completed'
            }
            aria-describedby='task-content'
            onClick={async () => {
              await handleTaskComplete(!task.completed);
              toast('1 Task Competed', {
                action: {
                  label: 'Undo',
                  onClick: () => handleTaskComplete(false),
                },
              });
            }}
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                task.completed ? 'opacity-100' : 'opacity-0',
              )}
            />
          </Button>
          <Card className='rounded-none border-none bg-transparent gap-0 py-2 space-y-1.5 flex-1'>
            <CardContent className='p-0'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:me-16',
                  task.completed && 'text-muted-foreground line-through',
                )}
              >
                {task.content}
              </p>
            </CardContent>

            <CardFooter className='p-0 flex gap-4'>
              {task.due_date && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getDueDateColorClass(task.due_date, task.completed),
                  )}
                >
                  <CalendarDays size={14} />
                  {formatDate(task.due_date)}
                </div>
              )}

              <div className='grid grid-cols-[minmax(0,180px)_max-content] items-center gap-1 text-sm text-muted-foreground ms-auto'>
                <div className='truncate text-right'>
                  {task.project?.name || 'Inbox'}
                </div>

                {task.project ? (
                  <Hash
                    size={14}
                    className='text-muted-foreground'
                  />
                ) : (
                  <Inbox
                    size={14}
                    className='text-muted-foreground'
                  />
                )}
              </div>
              <div className='flex space-x-3 absolute right-0 top-0 opacity-0 max-md:opacity-100 transition-opacity duration-200 group-hover/card:opacity-100'>
                {!task.completed && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        className='text-muted-foreground w-6 h-6'
                        aria-label='Edit Task'
                        onClick={() => setShowTaskForm(true)}
                      >
                        <Edit />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Task</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                <AlertDialog>
                  <Tooltip>
                    <AlertDialogTrigger asChild>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          className='text-muted-foreground w-6 h-6'
                          aria-label='Remove Task'
                        >
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                    </AlertDialogTrigger>
                    <TooltipContent>
                      <p>Remove Task</p>
                    </TooltipContent>
                  </Tooltip>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you Sure to Delete task?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        The <strong>"{task.content}"</strong> task will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-red-600 hover:bg-red-700'
                        onClick={handleDeleteTask}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      {showTaskForm && (
        <TaskForm
          defaultFormData={{
            ...task,
            project: project && project.$id,
          }}
          mode='edit'
          onCancel={() => setShowTaskForm(false)}
          onSubmit={handleTaskUpdateForm}
        />
      )}
    </>
  );
};

export default TaskCard;
