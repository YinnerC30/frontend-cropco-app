import { z } from "zod";

export const formSchemaConsumption = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),

});
