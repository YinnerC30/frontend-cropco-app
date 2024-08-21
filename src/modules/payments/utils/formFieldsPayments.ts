import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsPayments: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo el pago",
  },
  employee: {
    name: "employee",
    label: "Empleado:",
    placeholder: "Selecciona un empleado",
    description: "",
  },
  method_of_payment: {
    name: "method_of_payment",
    label: "Método de pago:",
    placeholder: "Selecciona",
    description: "Medio por el cual se pagara al empleado",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "",
    description: "",
  },
};
