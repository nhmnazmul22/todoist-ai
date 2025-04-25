import Logo from '@/components/common/Logo';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import TaskForm from '@/components/main/TaskFormDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SIDEBAR_LINKS } from '@/constant';
import { UserButton } from '@clerk/clerk-react';
import { ChevronRight, Plus, PlusCircle } from 'lucide-react';
import { Link } from 'react-router';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to='/app/inbox'
          className='p-2'
        >
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className='px-2 py-3'>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Add task button */}
            <SidebarMenuItem>
              <TaskForm>
                <SidebarMenuButton className='cursor-pointer'>
                  <PlusCircle /> Add Task
                </SidebarMenuButton>
              </TaskForm>
            </SidebarMenuItem>

            {/* Sidebar Menu items */}
            {SIDEBAR_LINKS.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link to={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className='right-[12px]'>0</SidebarMenuBadge>
              </SidebarMenuItem>
            ))}

            {/* Collapsable Mene items */}
            <Collapsible
              defaultOpen
              className='group/collapsible'
            >
              <SidebarGroup className='px-0'>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className='text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground '>
                    <ChevronRight className='me-2 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                    <span>Project</span>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarGroupAction aria-label='add Todo'>
                      <Plus />
                    </SidebarGroupAction>
                  </TooltipTrigger>
                  <TooltipContent side='right'>Add Project</TooltipContent>
                </Tooltip>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <p className='text-muted-foreground text-sm p-2'>
                          Click + to add some project
                        </p>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: '!w-full',
              userButtonTrigger:
                '!shadow-none !w-full !justify-start p-2 hover:!bg-sidebar-accent',
              userButtonBox: '!flex-row-reverse !shadow-none !gap-2',
              userButtonOuterIdentifier: '!ps-0',
              popoverBox: '!pointer-events-auto',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
