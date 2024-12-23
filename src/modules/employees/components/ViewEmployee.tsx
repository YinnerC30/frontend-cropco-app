import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetEmployee } from '../hooks/queries/useGetEmployee';
import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import FormEmployee from './form/FormEmployee';

export const ViewEmployee: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployee(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_EMPLOYEE_PATHS.ViewAll, name: 'Empleados' }]}
        finalItem={`Información del empleado`}
      />

      <FormEmployee defaultValues={data} readOnly />
    </>
  );
};

export default ViewEmployee;
