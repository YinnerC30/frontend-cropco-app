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

import { NavLink, useNavigate } from 'react-router-dom';
import { useHome } from '../hooks/useHome';
import { MyAccount } from './MyAccount';
import { useAuthContext } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export function AppSidebar() {
  const { nameModulesUser } = useHome();

  const { setOpenMobile, isMobile } = useSidebar();

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
        skiptRedirection: false,
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
                if (
                  nameModulesUser.includes(route.name_module) ||
                  route.name_module === 'N/A'
                ) {
                  return (
                    <SidebarMenuItem key={route.path}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          onClick={(e) => handleClick(e, route.path)}
                          to={route.path}
                        >
                          <span className="w-4 h-4 mr-2">{route.Icon}</span>

                          <span>{route.label}</span>
                        </NavLink>
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
