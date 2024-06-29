import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsWork: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo la venta",
  },
  description: {
    name: "description",
    label: "Descripción:",
    placeholder: "",
    description: "Alguna descripción sobre el trabajo realizado",
  },
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
};
