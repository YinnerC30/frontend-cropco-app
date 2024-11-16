import { CustomFormField } from "@/modules/core/interfaces/Form/CustomFormField";

export const formFieldsSearchBarWork: Record<string, CustomFormField> = {
  crop: {
    name: "crop",
    label: "Filtrar por cultivo:",
    placeholder: "Selecciona un cultivo",
    description: "Nombre del cultivo al cual se le realizo la cosecha",
  },
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
    label: "Filtrar por total a pagar:",
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
};
