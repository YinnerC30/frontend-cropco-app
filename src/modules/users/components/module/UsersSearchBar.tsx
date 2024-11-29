import { BasicSearchBar } from '@/modules/core/components';
import { useUsersModuleContext } from '../../hooks';

export const UsersSearchBar = () => {
  const { value, hasPermission } = useUsersModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('users', 'find_all_users')}
      />
    </div>
  );
};
