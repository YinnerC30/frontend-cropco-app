import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetTenant } from '../hooks';
import { FormTenant } from './form';
import { MODULE_TENANTS_PATHS } from '../routes/pathRoutes';

export const ViewTenant: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetTenant(id!);

  if (isLoading) return <Loading />;

  return (
    <div className="select-none">
      <BreadCrumb
        items={[{ link: MODULE_TENANTS_PATHS.ViewAll, name: 'Inquilinos' }]}
        finalItem={'Ver'}
      />
      <div className="">
        <FormTenant defaultValues={data} readOnly={true} />
      </div>
    </div>
  );
};

export default ViewTenant;
