import { cn, formatDate, getDueDateColorClass } from '@/lib/utils';
import { Models } from 'appwrite';
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFetcher } from 'react-router';
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

  return (
    <>
      {!showTaskForm && (
        <div className='flex w-full gap-2 items-start relative group/card border-b border-foreground/10 my-2'>
          <Button
            variant='outline'
            size='icon'
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              completed && 'bg-border',
            )}
            role='checkbox'
            aria-checked={completed}
            aria-label={completed ? 'Task completed' : 'Task not completed'}
            aria-describedby='task-content'
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                completed ? 'opacity-100' : 'opacity-0',
              )}
            />
          </Button>
          <Card className='rounded-none border-none bg-transparent gap-0 py-2 space-y-1.5 flex-1'>
            <CardContent className='p-0'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:me-16',
                  completed && 'text-muted-foreground line-through',
                )}
              >
                {content}
              </p>
            </CardContent>

            <CardFooter className='p-0 flex gap-4'>
              {dueDate && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getDueDateColorClass(dueDate, completed),
                  )}
                >
                  <CalendarDays size={14} />
                  {formatDate(dueDate)}
                </div>
              )}

              <div className='grid grid-cols-[minmax(0,180px)_max-content] items-center gap-1 text-sm text-muted-foreground ms-auto'>
                <div className='truncate text-right'>
                  {project?.name || 'Inbox'}
                </div>

                {project ? (
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
                {!completed && (
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

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      className='text-muted-foreground w-6 h-6'
                      aria-label='Remove Task'
                    >
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove Task</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      {showTaskForm && (
        <TaskForm
          defaultFormData={{
            id,
            content,
            due_date: dueDate,
            projectId: project && project.$id,
          }}
          mode='edit'
          onCancel={() => setShowTaskForm(false)}
          onSubmit={(formDate) => {
            fetcher.submit(JSON.stringify(formDate), {
              action: '/app',
              method: 'PUT',
              encType: 'application/json',
            });

            setShowTaskForm(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
