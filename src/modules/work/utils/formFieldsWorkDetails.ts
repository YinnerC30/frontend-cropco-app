import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsWorkDetails: Record<string, CustomFormField> = {
  value_pay: {
    name: "value_pay",
    label: "Valor a pagar:",
    placeholder: "",
    description: "Dinero a pagar por el trabajo",
  },
  payment_is_pending: {
    name: "payment_is_pending",
    label: "¿Pendiente de pago?:",
    placeholder: "",
    description: "¿Esta pendiente por pagar?",
  },
  first_name: {
    name: "first_name",
    label: "Empleado:",
    placeholder: "Selecciona un empleado",
    description: "",
  },
};
