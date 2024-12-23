import { BasicSearchBar } from '@/modules/core/components';
import { useUsersModuleContext } from '../../hooks';

export const UsersSearchBar: React.FC = () => {
  const { paramQuery, actionsUsersModule } = useUsersModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsUsersModule['find_all_users']}
      />
    </div>
  );
};
