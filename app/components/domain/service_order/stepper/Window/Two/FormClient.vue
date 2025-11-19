<script lang="ts" setup>
import { boolean, object, string } from "yup";

const dayjs = useDayjs();

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const schema = object({
  name: string().required("Nome é obrigatório"),
  gender: string().required("Genero é obrigatório"),
  type: boolean().required("Tipo do cliente obrigatório"),
  cpf_cnpj: string()
    .min(14, "CPF/CNPJ deve ter no mínimo 14 caracteres")
    .max(18)
    .notRequired()
    .transform((value: string) => (value == "" ? null : value)),
  identity_number: string()
    .min(12, "RG/IE deve ter no mínimo 12 caracteres")
    .notRequired()
    .transform((value: string) => (value == "" ? null : value)),
  born_date: string()
    .notRequired()
    .test(
      "is-date",
      "Formato da data invalida. (DD/MM/YYYY)",
      (value) => !value || dayjs(value, "DD/MM/YYYY", true).isValid()
    ),
  email: string().email("Email invalido").notRequired(),
  number1: string()
    .required("Telefone é obrigatório")
    .test(
      "is-number",
      "Formato invalido. (XX) XXXXX-XXXX",
      (value) => !value || phoneRegex.test(value)
    ),
  number2: string().notRequired(),
  number3: string().notRequired(),
});

const { errors } = useForm({
  validationSchema: schema,
});

const clientStore = useServiceOrderClientStore();
const { errorsClientData } = storeToRefs(clientStore);

watch(errors, () => {
  errorsClientData.value = errors.value;
});
</script>

<template>
  <v-form>
    <v-card
      title="DADOS DO CLIENTE"
      subtitle="Criação ou atualização de cliente."
      flat
    >
      <v-row dense>
        <v-col>
          <ServiceOrderInputName />
        </v-col>
        <v-col cols="3">
          <ServiceOrderInputGender />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="2">
          <ServiceOrderInputType />
        </v-col>

        <v-col>
          <ServiceOrderInputCpfCnpj />
        </v-col>

        <v-col>
          <ServiceOrderInputIdentityNumber />
        </v-col>

        <v-col>
          <ServiceOrderInputBornDate />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <ServiceOrderInputEmail />
        </v-col>

        <v-col>
          <ServiceOrderInputNumber1 />
        </v-col>

        <v-col>
          <ServiceOrderInputNumber2 />
        </v-col>

        <v-col>
          <ServiceOrderInputNumber3 />
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>
