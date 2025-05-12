import { PROJECT_COLORS } from '@/constant';
import { cn } from '@/lib/utils';
import { Project, ProjectForm } from '@/types';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Bot, Check, ChevronDown, Circle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

// Types
type ProjectFormTypes = {
  defaultFormData?: Project;
  mode: 'create' | 'edit';
  onCancel?: () => void;
  onSubmit?: (fromData: ProjectForm) => void;
};

const DEFAULT_PROJECT_NAME = 'Untilled';
const DEFAULT_PROJECT_COLOR_NAME = 'Slate';
const DEFAULT_PROJECT_COLOR_HEX = '#64748b';

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
};

const FormProject: React.FC<ProjectFormTypes> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel = () => {},
  onSubmit,
}) => {
  const [projectName, setProjectName] = useState<string>(defaultFormData.name);
  const [projectNameCount, setProjectNameCount] = useState<number>(
    defaultFormData.name.length,
  );
  const [colorName, setColorName] = useState<string>(
    defaultFormData.color_name,
  );
  const [colorHex, setColorHex] = useState<string>(defaultFormData.color_hex);
  const [colorOpen, setColorOpen] = useState<boolean>(false);
  const [aiTaskGen, setAiTaskGen] = useState<boolean>(false);
  const [taskGenPrompt, setTaskGenPrompt] = useState<string>('');
  const [formData, setFormData] = useState<ProjectForm>({
    ...defaultFormData,
    ai_task_gen: aiTaskGen,
    task_gen_prompt: taskGenPrompt,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: projectName,
      color_name: colorName,
      color_hex: colorHex,
      ai_task_gen: aiTaskGen,
      task_gen_prompt: taskGenPrompt,
    }));
  }, [projectName, colorHex, colorName, aiTaskGen, taskGenPrompt]);

  // Handle Color Name and Hex
  const handleColorNameHex = (value: string) => {
    const [name, hex] = value.split('=');
    setColorName(name);
    setColorHex(hex);
    setColorOpen(false);
  };

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (onSubmit) onSubmit(formData);
  }, [onSubmit, formData]);

  // Handle key submit
  const handleKeySubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Card className='bg-transparent border-0 gap-2'>
      <CardHeader className='px-4 py-0'>
        <CardTitle>
          {mode === 'create' ? 'Add Project' : 'Edit Project'}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='px-2'>
        <div className=''>
          <Label
            htmlFor='project_name'
            className='text-muted-foreground text-sm'
          >
            Project Name
          </Label>
          <Input
            type='text'
            name='project_name'
            id='project_name'
            className='!ring-0 !bg-transparent text-sm lg:text-base mt-1'
            onInput={(e) => {
              setProjectName(e.currentTarget.value);
              setProjectNameCount(e.currentTarget.value.length);
            }}
            value={projectName}
            maxLength={80}
            onKeyDown={handleKeySubmit}
          />
          <p
            className={cn(
              'text-xs text-muted-foreground ms-auto max-w-fit mt-1',
              projectNameCount >= 70 && 'text-destructive',
            )}
          >
            {projectNameCount}/80
          </p>
        </div>
        <div>
          <Label htmlFor='project_color'>Color</Label>
          <Popover
            modal={true}
            open={colorOpen}
            onOpenChange={setColorOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full mt-2'
              >
                <Circle fill={colorHex} />
                {colorName}
                <ChevronDown className='ms-auto' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='p-0'
            >
              <Command>
                <CommandInput placeholder='Search Color....' />
                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No color found !</CommandEmpty>
                    <CommandGroup>
                      {PROJECT_COLORS.map(({ hex, name }) => (
                        <CommandItem
                          key={name}
                          value={`${name}=${hex}`}
                          onSelect={handleColorNameHex}
                        >
                          <Circle fill={hex} />
                          {name}
                          {colorName === name && <Check className='ms-auto' />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {mode === 'create' && (
          <div className='mt-5 border rounded-md px-2'>
            <div className='flex py-2 px-0 gap-3 items-center '>
              <Bot className='shrink-0' />
              <div className='space-y-0.5 me-auto'>
                <Label
                  htmlFor='ai_task'
                  className='block'
                >
                  Ai Task Generator
                </Label>
                <p className='text-muted-foreground text-xs'>
                  Automatically task generated by giving a simple prompt{' '}
                </p>
              </div>
              <Switch
                id='ai_task'
                onCheckedChange={setAiTaskGen}
              />
            </div>
            {aiTaskGen && (
              <Textarea
                className='!bg-transparent mb-2 text-sm'
                placeholder='Tell me about your project'
                autoFocus
                value={taskGenPrompt}
                onChange={(e) => setTaskGenPrompt(e.currentTarget.value)}
                onKeyDown={handleKeySubmit}
              />
            )}
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className='flex gap-3 justify-end px-4'>
        <Button
          variant='secondary'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!projectName || (aiTaskGen && !taskGenPrompt)}
          onClick={handleSubmit}
        >
          {mode == 'create' ? 'Add' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormProject;
