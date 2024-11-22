import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetEmployee } from '../hooks/useGetEmployee';
import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import FormEmployee from './FormEmployee/FormEmployee';

export const ViewEmployee = () => {
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
