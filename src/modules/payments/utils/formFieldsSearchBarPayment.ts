import { CustomFormField } from "@/modules/core/interfaces/Form/CustomFormField";

export const formFieldsSearchBarPayment: Record<string, CustomFormField> = {
  employee: {
    name: "employee",
    label: "Filtrar por empleado:",
    placeholder: "Selecciona un empleado",
    description: "Nombre del empleado al cual se le realizo el pago",
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
    label: "Filtrar por total cosechado:",
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
  filter_by_method_of_payment: {
    name: "filter_by_method_of_payment",
    label: "Filtrar por total pagos pendiente:",
    placeholder: "",
    description: "Activa la opción para filtrar por este modo",
  },
  method_of_payment: {
    name: "method_of_payment",
    label: "Metodo de pago:",
    placeholder: "Selecciona una opción",
    description: "Filtrar registros por  metodo de pago",
  },
};
