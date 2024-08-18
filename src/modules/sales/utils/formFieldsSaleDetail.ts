import { CustomFormField } from "@/modules/core/interfaces/CustomFormField";

export const formFieldsSaleDetail: Record<string, CustomFormField> = {
  client: {
    name: "client",
    label: "Cliente:",
    placeholder: "Selecciona",
    description: "Selecciona el nombre del cliente",
  },
  crop: {
    name: "crop",
    label: "Cultivo:",
    placeholder: "Selecciona un cultivo",
    description: "Selecciona el nombre del cultivo",
  },
  total: {
    name: "total",
    label: "Total:",
    placeholder: "0",
    description: "Introduce la cantidad de dinero a recibir",
  },
  quantity: {
    name: "quantity",
    label: "Cantidad:",
    placeholder: "0",
    description: "Introduce la cantidad a vender",
  },
};
