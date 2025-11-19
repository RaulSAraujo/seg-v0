import * as yup from "yup";

export const validationSchema = yup.object({
    serial: yup
        .string()
        .required("O número de série é obrigatório.")
        .max(100, "Máximo de 100 caracteres."),
    version: yup.string().max(50, "Máximo de 50 caracteres.").required("Versão é obrigatória").nullable(),
    branch: yup
        .string()
        .required("Marca é obrigatória.")
        .max(100, "Máximo de 100 caracteres."),
});
