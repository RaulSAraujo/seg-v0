import * as yup from "yup";

const { isDate } = useDateConversion();

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const clientSchema = yup.object({
    flag_client: yup.number().required(),
    name: yup.string().required("Nome é obrigatório"),
    gender: yup.string().required("Gênero é obrigatório"),
    type: yup.boolean().required("Tipo do cliente obrigatório"),
    cpf_cnpj: yup.string()
        .min(14, "CPF/CNPJ deve ter no mínimo 14 caracteres")
        .max(18)
        .notRequired()
        .transform((value: string) => (value == "" ? null : value)),
    identity_number: yup.string()
        .min(12, "RG/IE deve ter no mínimo 12 caracteres")
        .notRequired()
        .transform((value: string) => (value == "" ? null : value)),
    born_date: yup.string().nullable().test(
        "is-date",
        "Formato da data invalida. (DD/MM/YYYY)",
        (value) => !value || isDate(value) || false
    ),
    email: yup.string().email("Email invalido").nullable(),
    number1: yup.string()
        .required("Telefone é obrigatório")
        .test(
            "is-number",
            "Formato invalido. (XX) XXXXX-XXXX",
            (value) => !value || phoneRegex.test(value)
        ),
    number2: yup.string().notRequired(),
    number3: yup.string().notRequired(),
    identifier_number1: yup.string().notRequired(),
    identifier_number2: yup.string().notRequired(),
    identifier_number3: yup.string().notRequired(),
    observation: yup.string().notRequired(),
});

const AddressesSchema = yup.object({
    zipcode: yup.string()
        .min(8, "Cep deve ter no mínimo 8 caracteres")
        .required("Cep é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    neighbourhood: yup.string().required("Bairro é obrigatório"),
    street: yup.string().required("Rua é obrigatória"),
    number: yup.string().required("Numero é obrigatório"),
    complement: yup.string().notRequired(),
    type: yup.string().default("Faturamento"),
    country: yup.string().default("BRASIL"),
})

const clientWithAddressSchema = yup.object({
    ...clientSchema.fields,
    ClientsAddresses: yup.object(AddressesSchema.fields),
})

export { clientSchema, AddressesSchema, clientWithAddressSchema };