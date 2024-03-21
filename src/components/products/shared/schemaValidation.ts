import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constantsImage";

export const formScheme = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, {
      message: "El nombre debe tener como mínimo 1 carácter",
    })
    .max(30, {
      message: "El nombre solo puede tener 30 carácteres",
    }),
  price: z
    .number({
      required_error: "El precio es requerido",
      invalid_type_error: "El precio debe ser un número",
    })
    .min(1, {
      message: "El precio debe ser 1 como mínimo",
    }),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        file.length == 1
          ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
            ? true
            : false
          : true,
      "La imagen solo puede ser del formato jpeg, jpg, png, webp."
    )
    .refine(
      (file) =>
        file.length == 1
          ? file[0]?.size <= MAX_FILE_SIZE
            ? true
            : false
          : true,
      "El tamaño máximo de la imagen es de 5MB."
    ),
});
