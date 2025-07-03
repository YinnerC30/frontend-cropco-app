import { Building2, LogOut, Moon, Sun, UserRoundCog } from 'lucide-react';

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

import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { PATH_MANAGEMENT_HOME_APP } from '@/config';
import { useAuthTenantContext } from './AuthTenantContext';
import { MyAdministratorAccount } from './MyAdministratorAccount';
import { useLogoutAdministrator } from '../hooks/mutations/useLogoutAdministrator';

export function AppManagementSidebar() {
  // const { nameModulesUser } = useHome();

  const { setOpenMobile, isMobile } = useSidebar();

  const url = useLocation();

  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();

  const { removeTenantManagement } = useAuthTenantContext();
  const mutationLogoutAdmin = useLogoutAdministrator();

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

  const handleLogout = () => {
    removeTenantManagement();
    mutationLogoutAdmin.mutate();
  };

  const routes = [
    {
      path: `${PATH_MANAGEMENT_HOME_APP}/administrators/view/all`,
      label: 'Administradores',
      Icon: <UserRoundCog className="w-4 h-4" />,
      name_module: 'administrators',
    },
    {
      path: `${PATH_MANAGEMENT_HOME_APP}/tenants/view/all`,
      label: 'Inquilinos',
      Icon: <Building2 className="w-4 h-4" />,
      name_module: 'tenants',
    },
  ];

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarHeader>
          <MyAdministratorAccount />
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                return (
                  <SidebarMenuItem
                    key={route.path}
                    className="hover:cursor-pointer"
                  >
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
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut /> Salir
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
