import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

export const formFieldsSupply: Record<string, CustomFormField> = {
  name: {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Insumo 1',
    description: 'Nombre del insumo o producto',
  },
  brand: {
    name: 'brand',
    label: 'Marca:',
    placeholder: 'Yara',
    description: 'Marca a la cual pertenece al producto',
  },
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida que posee el insumo',
  },

  observation: {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se recomienda aplicarlo cada...',
    description: 'Alguna información de utilidad sobre el producto',
  },
};
