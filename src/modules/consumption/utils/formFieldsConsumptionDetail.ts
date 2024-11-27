import { CustomFormField } from "@/modules/core/interfaces/form/CustomFormField";

export const formFieldsConsumptionDetail: Record<string, CustomFormField> = {
  supply: {
    name: "supply",
    label: "Insumo:",
    placeholder: "Selecciona un insumo",
    description: "Insumo a comprar",
  },
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Seleccione un cultivo",
    description: "Cultivo al cual se suministro el insumo",
  },
  amount: {
    name: "amount",
    label: "Monto:",
    placeholder: "0",
    description: "Cantidad a consumir",
  },
};
