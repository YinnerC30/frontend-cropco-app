import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type FormFieldsShoppingDetail = 'supply' | 'supplier' | 'amount' | 'total';

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
  amount: {
    name: 'amount',
    label: 'Monto:',
    placeholder: '0',
    description: 'Cantidad a comprar',
  },
  total: {
    name: 'total',
    label: 'Total a pagar:',
    placeholder: '0',
    description: 'Cantidad a pagar',
  },
};
