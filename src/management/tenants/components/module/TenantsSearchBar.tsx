import { BasicSearchBar } from '@/modules/core/components';
import { useTenantsModuleContext } from './TenantsModuleContext';

export const TenantsSearchBar: React.FC = () => {
  const { searchValue, setSearchValue } = useTenantsModuleContext();

  return (
    <BasicSearchBar
      query={searchValue}
      // setQuery={setSearchValue}
      // placeholder="Buscar inquilinos..."
    />
  );
};
