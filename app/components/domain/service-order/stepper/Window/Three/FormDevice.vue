<script lang="ts" setup>
import { object, string } from "yup";

const schema = object({
  supplier: string().required("Marca é obrigatório"),
  apparatus: string().required("Aparelho é obrigatório"),
  model: string().required("Modelo é obrigatório"),
  serial: string().notRequired(),
  version: string().notRequired(),
  defect_description: string().required("Informe o defeito relatado"),
  apparatus_condition: string().required("Informe a condição do aparelho"),
  accessories: string().notRequired(),
});

const { errors } = useForm({
  validationSchema: schema,
});

const apparatusStore = useServiceOrderApparatusStore();
const { errorsApparatusData } = storeToRefs(apparatusStore);

watch(errors, () => {
  errorsApparatusData.value = errors.value;
});
</script>

<template>
  <v-form>
    <v-card title="APARELHO" subtitle="Informações gerais do aparelho." flat>
      <v-row dense>
        <v-col>
          <ServiceOrderInputSupplier />
        </v-col>

        <v-col>
          <ServiceOrderInputApparatus />
        </v-col>

        <v-col>
          <ServiceOrderInputModel />
        </v-col>

        <v-col>
          <ServiceOrderInputSerial />
        </v-col>

        <v-col cols="2">
          <ServiceOrderInputVersion />
        </v-col>

        <v-col cols="12">
          <ServiceOrderInputDefectDescription />
        </v-col>

        <v-col cols="12">
          <ServiceOrderInputAcessories />
        </v-col>

        <v-col cols="12">
          <ServiceOrderInputApparatusCondition />
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>
