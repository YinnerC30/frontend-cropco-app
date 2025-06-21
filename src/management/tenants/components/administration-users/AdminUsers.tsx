import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetAllTenantUsers } from '../../hooks/queries/useGetAllTenantUsers';
import { MODULE_TENANTS_PATHS } from '../../routes/pathRoutes';
import { TenantUsersTable } from './TenantUsersTable';
import { FormTenant } from '../form';
import { useGetTenant } from '../../hooks';

export const AdminUsers = () => {
  const { id } = useParams();

  const queryTenant = useGetTenant(id!);

  const queryTenantUsers = useGetAllTenantUsers(id!);

  if (queryTenant.isLoading || queryTenantUsers.isLoading) return <Loading />;

  return (
    <div>
      <BreadCrumb
        items={[{ link: MODULE_TENANTS_PATHS.ViewAll, name: 'Inquilinos' }]}
        finalItem={'Administrar usuarios'}
      />
      <FormTenant defaultValues={queryTenant.data} readOnly={true}>
        <TenantUsersTable
          tenantId={id!}
          data={queryTenantUsers.data || []}
          refetchAction={async () => {
            await queryTenantUsers.refetch();
          }}
        />
      </FormTenant>
    </div>
  );
};
