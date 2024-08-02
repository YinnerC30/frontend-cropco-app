import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsHarvestDetail: Record<string, CustomFormField> = {
  employee: {
    name: "employee",
    label: "Empleado:",
    placeholder: "Selecciona un empleado",
    description: "Selecciona el nombre del empleado",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "0",
    description: "Introduce la cantidad que ha cosechado",
  },
  value_pay: {
    name: "value_pay",
    label: "Valor a pagar:",
    placeholder: "0",
    description: "Introduce el valor a pagar por la cosecha",
  },
};
