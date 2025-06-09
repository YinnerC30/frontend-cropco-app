import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { z } from 'zod';

export const CreateFormSchemaHarvestProcessed = (
  dateHarvest: string | Date
) => {
  const formSchema = z.object({
    date: z.date({ required_error: 'La fecha es un campo obligatorio' }).refine(
      (date) => {
        return new Date(date) > new Date(dateHarvest);
      },
      {
        message: 'La fecha debe ser superior a la de la cosecha',
      }
    ),
    unit_of_measure: z.nativeEnum(MassUnitOfMeasure, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una unidad de medida.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar una unidad de medida válida.' };
          default:
            return { message: 'Error en la selección de unidad de medida.' };
        }
      },
    }),
    amount: z.coerce
      .number({
        required_error: `El amount es requerido`,
        invalid_type_error: `Debe introducir un valor numérico`,
      })
      .positive({ message: `El número debe ser positivo` }),
  });
  return formSchema;
};
