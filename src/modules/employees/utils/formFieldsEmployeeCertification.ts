import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type EmployeeCertificationFormFields =
  | 'generator_name'
  | 'generator_position'
  | 'company_name'
  | 'start_date'
  | 'employee_position'
  | 'weekly_working_hours';

export const formFieldsEmployeeCertification: Record<
  EmployeeCertificationFormFields,
  CustomFormField
> = {
  generator_name: {
    name: 'generator_name',
    label: 'Nombre del generador:',
    placeholder: 'Juan Pérez',
    description: 'Nombre de la persona que genera el certificado',
  },
  generator_position: {
    name: 'generator_position',
    label: 'Cargo del generador:',
    placeholder: 'Gerente de Recursos Humanos',
    description: 'Cargo de la persona que genera el certificado',
  },
  company_name: {
    name: 'company_name',
    label: 'Nombre de la empresa:',
    placeholder: 'Empresa S.A.S.',
    description: 'Nombre de la empresa que emite el certificado',
  },
  start_date: {
    name: 'start_date',
    label: 'Fecha de inicio:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha de inicio de labores del empleado',
  },
  employee_position: {
    name: 'employee_position',
    label: 'Cargo del empleado:',
    placeholder: 'Desarrollador de Software',
    description: 'Cargo desempeñado por el empleado',
  },
  weekly_working_hours: {
    name: 'weekly_working_hours',
    label: 'Horas semanales:',
    placeholder: '40',
    description: 'Cantidad de horas trabajadas por semana',
  },
};
