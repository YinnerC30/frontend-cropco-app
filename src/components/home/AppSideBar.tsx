import { LogOut, Moon, Sun } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useFormChange, useTheme } from '@/modules/core/components';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';
import { Route, routes } from '@/routes/components/RoutesNavBar';

import { useAuthContext } from '@/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHome } from '../hooks/useHome';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MyAccount } from './MyAccount';

export function AppSidebar() {
  const { nameModulesUser } = useHome();

  const { setOpenMobile, isMobile } = useSidebar();

  const url = useLocation();

  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();

  const { removeUser } = useAuthContext();

  const { setTheme } = useTheme();

  const navigate = useNavigate();

  const handleClick = (e: any, path: string) => {
    e.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        route: path,
        skipRedirection: false,
        action: () => {
          isMobile && setOpenMobile(false);
        },
      });
    } else {
      isMobile && setOpenMobile(false);
      navigate(path);
    }
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarHeader>
          <MyAccount />
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route: Route) => {
                if (nameModulesUser.includes(route.name_module)) {
                  return (
                    <SidebarMenuItem key={route.path} className='hover:cursor-pointer'>
                      <SidebarMenuButton
                        onClick={(e) => handleClick(e, route.path)}
                        isActive={url.pathname.includes(route.name_module)}
                        asChild
                      >
                        <div>
                          {route.Icon}
                          <span>{route.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center ">
          <DropdownMenu>
            {/* <SidebarMenuButton> */}
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Tema</span>
              </Button>
            </DropdownMenuTrigger>
            {/* </SidebarMenuButton> */}
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SidebarMenuButton onClick={() => removeUser()}>
          <LogOut /> Salir
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
