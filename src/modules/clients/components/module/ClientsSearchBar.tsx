import { BasicSearchBar } from '@/modules/core/components';
import { useClientsModuleContext } from '../../hooks';

export const ClientsSearchBar: React.FC = () => {
  const { paramQuery, actionsClientsModule } = useClientsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsClientsModule['find_all_clients']}
      />
    </div>
  );
};
