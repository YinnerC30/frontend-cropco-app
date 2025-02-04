import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

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
    description: 'Monto a comprar (mililitros o gramos)',
  },
  total: {
    name: 'total',
    label: 'Total a pagar:',
    placeholder: '0',
    description: 'Cantidad a pagar',
  },
};
