import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsSearchBarSale: Record<string, CustomFormField> = {
  filter_by_date: {
    name: "filter_by_date",
    label: "Filtrar por fecha:",
    placeholder: "",
    description: "Activa la opción para filtrar por este modo",
  },
  date_time_selection: {
    name: "date_time_selection",
    label: "Tiempo de la fecha:",
    placeholder: "Selecciona una opción",
    description: "Filtrar registros por antes o después de la fecha",
  },
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha de referencia para realizar la búsqueda",
  },
  filter_by_total: {
    name: "filter_by_total",
    label: "Filtrar por total:",
    placeholder: "",
    description: "Activa la opción para filtrar por este modo",
  },
  minor_or_major_selection: {
    name: "minor_or_major_selection",
    label: "Valor menor o mayor a:",
    placeholder: "Selecciona una opción",
    description: "Filtrar registros por menor o mayor del valor",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "100",
    description: "Valor de referencia para realizar la búsqueda",
  },
  filter_by_quantity: {
    name: "filter_by_quantity",
    label: "Filtrar por cantidad:",
    placeholder: "",
    description: "Activa la opción para filtrar por este modo",
  },
  minor_or_major_quantity_selection: {
    name: "minor_or_major_quantity_selection",
    label: "Valor menor o mayor a:",
    placeholder: "Selecciona una opción",
    description: "Filtrar registros por menor o mayor del valor",
  },
  quantity: {
    name: "quantity",
    label: "Cantidad vendida:",
    placeholder: "100",
    description: "Valor de referencia para realizar la búsqueda",
  },
  filter_by_is_receivable: {
    name: "filter_by_is_receivable",
    label: "Filtrar por pendiente de pago:",
    placeholder: "",
    description: "Activa la opción para filtrar por este modo",
  },
  is_receivable: {
    name: "is_receivable",
    label: "¿Pendiente de pago?:",
    placeholder: "Selecciona una opción",
    description: "Valor de referencia para realizar la búsqueda",
  },
};
