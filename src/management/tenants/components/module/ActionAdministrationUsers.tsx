import { ActionNavigate } from '@/modules/core/components';
import { GlobeIcon } from '@radix-ui/react-icons';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';

interface Props {
  //   subdomain: string;
  disabled?: boolean;
  //   path?: string;
}
export const ActionAdminUsers = ({ disabled = false }: Props) => {
  return (
    <ActionNavigate
      path={MODULE_TENANTS_PATHS.AdminUsers}
      Icon={GlobeIcon}
      name={'Usuarios'}
      disabled={disabled}
      //   target="_blank"
    />
  );
};
