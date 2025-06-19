import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetTenant } from '../hooks';
import { FormTenant } from './form';

export const ViewTenant: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetTenant(id!);

  if (isLoading) return <Loading />;

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Ver Inquilino" />
      <div className="">
        <FormTenant defaultValues={data} readOnly={true} />
      </div>
    </div>
  );
};

export default ViewTenant;
