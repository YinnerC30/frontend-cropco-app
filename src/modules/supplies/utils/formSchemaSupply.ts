import { z } from "zod";
import { AllUnitsOfMeasure } from "../interfaces/UnitOfMeasure";

export const formSchemaSupply = z.object({
  name: z
    .string()
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  brand: z
    .string()
    .min(4, {
      message: "La marca debe tener al menos 4 caracteres",
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  unit_of_measure: z.nativeEnum(AllUnitsOfMeasure, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return { message: "Debe seleccionar una unidad de medida." };
        case "invalid_enum_value":
          return { message: "Debe seleccionar GRAMOS o MILILITROS." };
        default:
          return { message: "Error en la selección de unidad de medida." };
      }
    },
  }),
  observation: z
    .string()
    .min(6, {
      message: "La observación debe tener mínimo 6 caracteres",
    })
    .max(500, { message: `La dirección debe tener máximo 200 caracteres` }),
});
