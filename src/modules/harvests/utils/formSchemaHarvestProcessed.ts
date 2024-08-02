import { z } from "zod";

export const formSchemaHarvestProcessed = (dateHarvest: string) => {
  const formSchema = z.object({
    date: z.date({ required_error: "La fecha es un campo obligatorio" }).refine(
      (date) => {
        return new Date(date) > new Date(dateHarvest);
      },
      {
        message: "La fecha debe ser superior a la de la cosecha",
      }
    ),
    total: z.coerce
      .number({
        required_error: `El total es requerido`,
        invalid_type_error: `Debe introducir un valor numérico`,
      })
      .positive({ message: `El número debe ser positivo` }),
  });
  return formSchema;
};
