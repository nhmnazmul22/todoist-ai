import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TaskFormType } from '@/types';
import {
  CalendarIcon,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from 'lucide-react';

import { cn, formatDate, getDueDateColorClass } from '@/lib/utils';
import * as chrono from 'chrono-node';
import { ClassValue } from 'clsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type TaskFormProps = {
  defaultFormData: TaskFormType;
  className: ClassValue;
  mode: 'create' | 'edit';
  onCancel: () => void;
  onSubmit: (formData: TaskFormType) => void;
};

const DEFAULT_FORM_DATA = {
  content: '',
  due_date: null,
  projectId: null,
};

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [content, setContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [projectId, setProjectId] = useState(defaultFormData.projectId);

  const [projectName, setProjectName] = useState('');
  const [projectColorHex, setProjectColorHex] = useState('');

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  // Set text value
  const setTextValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  // Set due date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeDueDate = (selected: any) => {
    setDueDate(selected);
    setDueDateOpen(false);
  };

  // set formdata
  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        content: content,
        due_date: dueDate,
        projectId: projectId,
      };
    });
  }, [content, dueDate, projectId]);

  // Set deu date from text
  useEffect(() => {
    const chronoParsed = chrono.parse(content);
    if (chronoParsed.length > 0) {
      const lastDate = chronoParsed[chronoParsed.length - 1];
      setDueDate(lastDate.date());
    }
  }, [content]);

  // Handle the task form data
  const handleSubmit = useCallback(() => {
    if (!content) return;
    if (onSubmit) onSubmit(formData);
    setContent('');
    setDueDate(null);
  }, [content, formData, onSubmit]);

  return (
    <Card className='focus-within:border-foreground/30 p-0 bg-transparent'>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 !bg-transparent text-sm lg:text-base'
          placeholder='After completing task, Take a tour'
          autoFocus
          value={content}
          onInput={setTextValue}
        />
        <div className='border max-w-max rounded-2xl'>
          <Popover
            modal
            open={dueDateOpen}
            onOpenChange={setDueDateOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={cn(getDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon />
                {dueDate ? formatDate(dueDate) : 'Due Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                disabled={{ before: new Date() }}
                initialFocus
                onSelect={changeDueDate}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='!px-2 -ms-2'
                  aria-label='Remove due date'
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>

        <Separator className='my-2' />

        <CardFooter className='grid grid-cols-[minmax(0,1fr)_max-content] gap-2 px-2'>
          <Popover
            modal
            open={projectOpen}
            onOpenChange={setProjectOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='max-w-max'
                aria-expanded={projectOpen}
              >
                <Inbox /> Inbox <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[240px] p-0'
              align='start'
            >
              <Command>
                <CommandInput placeholder='Search project...' />
                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No Project found!</CommandEmpty>
                    <CommandGroup>
                      <CommandItem>
                        <Hash /> Project 1
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 2
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 3
                      </CommandItem>

                      <CommandItem>
                        <Hash /> Project 4
                      </CommandItem>

                      <CommandItem>
                        <Hash /> Project 5
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 6
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 7
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 8
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 9
                      </CommandItem>

                      <CommandItem>
                        <Hash /> Project 10
                      </CommandItem>

                      <CommandItem>
                        <Hash /> Project 11
                      </CommandItem>
                      <CommandItem>
                        <Hash /> Project 12
                      </CommandItem>
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              onClick={onCancel}
            >
              <span className='max-md:hidden'>Cancel</span>
              <X className='md:hidden' />
            </Button>
            <Button
              disabled={!content}
              onClick={handleSubmit}
            >
              <span className='max-md:hidden'>
                {mode === 'create' ? 'Add task' : 'Save'}
              </span>
              <SendHorizonal className='md:hidden' />
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
