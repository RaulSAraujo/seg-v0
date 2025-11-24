<script lang="ts" setup>
import { object, string } from "yup";

const schema = object({
  zipcode: string()
    .min(8, "Cep deve ter no mínimo 8 caracteres")
    .required("Cep é obrigatório"),
  city: string().required("Cidade é obrigatória"),
  state: string().required("Estado é obrigatório"),
  neighbourhood: string().required("Bairro é obrigatório"),
  street: string().required("Rua é obrigatória"),
  number: string().required("O numero é obrigatório"),
  complement: string().notRequired(),
  observation: string().notRequired(),
  maps_location: string().notRequired(),
});

const { errors } = useForm({
  validationSchema: schema,
});

const addressStore = useServiceOrderAddressStore();
const { errorsAddressData } = storeToRefs(addressStore);

watch(errors, () => {
  errorsAddressData.value = errors.value;
});
</script>

<template>
  <v-card title="DADOS DO ENDEREÇO" flat>
    <v-row dense>
      <v-col cols="3">
        <ServiceOrderInputViaCep />
      </v-col>

      <v-col cols="3">
        <ServiceOrderInputCity />
      </v-col>

      <v-col cols="2">
        <ServiceOrderInputState />
      </v-col>

      <v-col cols="4">
        <ServiceOrderInputNeighbourhood />
      </v-col>

      <v-col cols="10">
        <ServiceOrderInputStreet />
      </v-col>

      <v-col cols="2">
        <ServiceOrderInputNumber />
      </v-col>

      <v-col cols="9">
        <ServiceOrderInputComplement />
      </v-col>

      <v-col cols="3">
        <ServiceOrderInputLocationMaps />
      </v-col>

      <v-col cols="12">
        <ServiceOrderInputObservation />
      </v-col>
    </v-row>
  </v-card>
</template>
