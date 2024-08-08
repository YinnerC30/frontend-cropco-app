import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsSearchBarHarvest: Record<string, CustomFormField> = {
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Selecciona un cultivo",
    description: "Nombre del cultivo al cual se le realizo la cosecha",
  },
  date: {
    name: "date",
    label: "Fecha:",
    placeholder: "Selecciona una fecha",
    description: "Fecha de referencia para realizar la búsqueda",
  },
  date_time_selection: {
    name: "date_time_selection",
    label: "Tiempo de la fecha:",
    placeholder: "Selecciona una opción",
    description: "Filtrar registros por antes o después de la fecha",
  },
};
