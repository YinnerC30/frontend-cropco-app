import { CustomFormField } from "@/modules/core/interfaces/form/CustomFormField";

type FormFieldsConsumption = 'date'|'details';

export const formFieldsConsumption: Record<FormFieldsConsumption, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo el consumo",
  },
  details: {
    name: "details",
    label: "Consumo realizado por insumo:",
    placeholder: "",
    description: "",
  },
};
