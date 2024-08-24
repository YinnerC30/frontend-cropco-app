import { z } from "zod";
import { formSchemaConsumptionDetail } from "./formSchemaConsumptionDetail";

export const formSchemaConsumption = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  details: z
    .array(formSchemaConsumptionDetail, {
      required_error:
        "Debes registrar los consumos que se han hecho a los cultivos",
    })
    .nonempty({
      message: "Debes registrar el consumo de al menos 1 insumo",
    }),
});
