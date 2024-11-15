// path: /components/UsersModuleComponents/UsersSearchBar.tsx
import { BasicSearchBar } from '@/modules/core/components';
import { useUsersModuleContext } from '../UsersModuleContext';

export const UsersSearchBar = () => {
  const { value, hasPermission } = useUsersModuleContext();

  return (
    <div className="flex items-center justify-center w-full py-2">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('users', 'find_all_users')}
      />
    </div>
  );
};
