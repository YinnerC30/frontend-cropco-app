import { z } from "zod";

export const formSchemaCategories = z.object({
  harvests: z
    .array(z.string().uuid(), {
      required_error: "Debes registrar las cosechas que vas a pagar",
    })
    .default([]).optional(),

  works: z
    .array(z.string().uuid(), {
      required_error: "Debes registrar los trabajos que vas a pagar",
    })
    .default([]).optional(),
});
