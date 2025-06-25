import { z } from 'zod';

export const formSchemaEmployeeCertification = z.object({
  generator_name: z
    .string({ required_error: 'El nombre del generador es requerido' })
    .min(2, {
      message: 'El nombre del generador debe tener al menos 2 caracteres',
    })
    .max(100, {
      message: 'El nombre del generador no debe exceder los 100 caracteres',
    }),
  generator_position: z
    .string({ required_error: 'El cargo del generador es requerido' })
    .min(2, {
      message: 'El cargo del generador debe tener al menos 2 caracteres',
    })
    .max(100, {
      message: 'El cargo del generador no debe exceder los 100 caracteres',
    }),
  company_name: z
    .string({ required_error: 'El nombre de la empresa es requerido' })
    .min(2, {
      message: 'El nombre de la empresa debe tener al menos 2 caracteres',
    })
    .max(100, {
      message: 'El nombre de la empresa no debe exceder los 100 caracteres',
    }),
  start_date: z.preprocess(
    (arg) =>
      typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg,
    z.date({ required_error: 'La fecha de inicio es requerida' })
  ),
  employee_position: z
    .string({ required_error: 'El cargo del empleado es requerido' })
    .min(2, {
      message: 'El cargo del empleado debe tener al menos 2 caracteres',
    })
    .max(100, {
      message: 'El cargo del empleado no debe exceder los 100 caracteres',
    }),
  weekly_working_hours: z.coerce
    .number({ required_error: 'Las horas semanales son requeridas', invalid_type_error: 'Las horas semanales son requeridas' })
    .int({ message: 'Las horas semanales deben ser un número entero' })
    .min(1, { message: 'Las horas semanales deben ser al menos 1' })
    .max(168, { message: 'Las horas semanales no pueden exceder 168' }),
});
