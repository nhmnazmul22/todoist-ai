import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { CalendarIcon, ChevronDown, Inbox, X } from 'lucide-react';

const TaskForm = () => {
  return (
    <Card className='focus-within:border-foreground/30 p-0 bg-transparent'>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 !bg-transparent text-sm lg:text-base'
          placeholder='After completing task, Take a tour'
          autoFocus
        />
        <div className='border max-w-max rounded-2xl'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
              >
                <CalendarIcon />
                Due Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='!px-2 -ms-2'
                aria-label='Remove due date'
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove due date</TooltipContent>
          </Tooltip>
        </div>

        <Separator />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='max-w-max'
              aria-expanded={false}
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
