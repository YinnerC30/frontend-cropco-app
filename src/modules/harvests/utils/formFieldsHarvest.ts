import { CustomFormField } from "@/modules/core/interfaces/form/CustomFormField";

export const formFieldsHarvest: Record<string, CustomFormField> = {
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha en la que se realizo la cosecha",
  },
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Selecciona un cultivo",
    description: "Nombre del cultivo al cual se le realizo la cosecha",
  },

  total: {
    name: "total",
    label: "Total:",
    placeholder: "",
    description: "Número de kilogramos cosechados",
  },
  value_pay: {
    name: "value_pay",
    label: "Valor a pagar:",
    placeholder: "",
    description: "Cantidad total a pagar por la cosecha",
  },
  observation: {
    name: "observation",
    label: "Observación:",
    placeholder: "Se cosecho hasta...",
    description: "Comentario u observación sobre la cosecha realizada",
  },
  details: {
    name: "details",
    label: "Cosechas realizadas por empleado:",
    placeholder: "",
    description: "",
  },
  total_processed: {
    name: "total_processed",
    label: "Total de cosecha procesada:",
    placeholder: "",
    description: "Número de kilogramos disponibles para la venta",
  },
};
