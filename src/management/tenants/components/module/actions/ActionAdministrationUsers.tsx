import { ActionNavigate } from '@/modules/core/components';
import { UsersRound } from 'lucide-react';
import { MODULE_TENANTS_PATHS } from '../../../routes/pathRoutes';

interface Props {
  id: string;
  disabled?: boolean;
}
export const ActionAdminUsers = ({ id, disabled = false }: Props) => {
  return (
    <ActionNavigate
      path={MODULE_TENANTS_PATHS.AdminUsers + id}
      Icon={UsersRound}
      name={'Usuarios'}
      disabled={disabled}
    />
  );
};
