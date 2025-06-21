import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetAllTenantUsers } from '../../hooks/queries/useGetAllTenantUsers';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';
import { TenantUsersTable } from './TenantUsersTable';

export const AdminUsers = () => {
  const { id } = useParams();

  const { data = [], isLoading } = useGetAllTenantUsers(id!);

  if (isLoading) return <Loading />;
  return (
    <div>
      <BreadCrumb
        items={[{ link: MODULE_TENANTS_PATHS.ViewAll, name: 'Inquilinos' }]}
        finalItem={'Administrar usuarios'}
      />
      <TenantUsersTable data={data} />
    </div>
  );
};
