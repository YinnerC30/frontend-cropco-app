import { CustomFormField } from "@/modules/core/interfaces/form/CustomFormField";

export const formFieldsHarvestProcessed: Record<string, CustomFormField> = {
    date: {
      name: 'date',
      label: 'Fecha:',
      placeholder: 'Selecciona una fecha',
      description: 'Fecha en la que se esta agregando la cantidad al monto',
    },
    crop: {
      name: 'crop',
      label: 'Cultivo:',
      placeholder: 'Selecciona un cultivo',
      description: 'Cultivo al cual pertenece el monto',
    },
    harvest: {
      name: 'harvest',
      label: 'Cosecha:',
      placeholder: 'Selecciona la cosecha',
      description:
        'Selecciona la fecha de la cosecha de la cual se obtuvo el monto',
    },
    total: {
      name: 'total',
      label: 'Total:',
      placeholder: '0',
      description: 'Escribe el monto resultante de la cosecha',
    },
  };