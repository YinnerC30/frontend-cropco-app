import { LogOut } from 'lucide-react';

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
} from '@/components/ui/sidebar';
import { useFormChange } from '@/modules/core/components';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';
import { Route, routes } from '@/routes/components/RoutesNavBar';

import { NavLink, useNavigate } from 'react-router-dom';
import { useHome } from '../hooks/useHome';
import { MyAccount } from './MyAccount';
import { useAuthContext } from '@/auth';

export function AppSidebar() {
  const { nameModulesUser } = useHome();

  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();

  const { removeUser } = useAuthContext();

  const navigate = useNavigate();

  const handleClick = (e: any, path: string) => {
    e.preventDefault();

    if (hasUnsavedChanges) {
      showToast({ route: path, skiptRedirection: false });
    } else {
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
        <SidebarMenuButton onClick={() => removeUser()}>
          <LogOut /> Salir
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
