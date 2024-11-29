import { BasicSearchBar } from '@/modules/core/components';
import { useClientsModuleContext } from '../../hooks';

export const ClientsSearchBar = () => {
  const { value, hasPermission } = useClientsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('clients', 'find_all_clients')}
      />
    </div>
  );
};
