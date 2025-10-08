import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsShoppingDetail =
  | 'supply'
  | 'unit_of_measure'
  | 'supplier'
  | 'amount'
  | 'value_pay';

export const formFieldsShoppingDetail: Record<
  FormFieldsShoppingDetail,
  CustomFormField
> = {
  supply: {
    name: 'supply',
    label: 'Insumo:',
    placeholder: 'Selecciona un insumo',
    description: 'Insumo a comprar',
  },
  supplier: {
    name: 'supplier',
    label: 'Proveedor:',
    placeholder: 'Seleccione un proveedor',
    description: 'Proveedor del insumo',
  },
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida de compra',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad:',
    placeholder: '0',
    description: 'Cantidad a comprar',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Total a pagar:',
    placeholder: '0',
    description: 'Valor a pagar',
  },
};
