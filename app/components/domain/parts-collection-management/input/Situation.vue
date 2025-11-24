<script lang="ts" setup>
const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);

const dayjs = useDayjs();

const situation = [
  "PENDENTE",
  "EM ABERTO",
  "DEV SOLICITADA",
  "EMBALADO P/ COLETA",
  "LIBERADO P/ LAB",
  "LIBERADO P/ VENDA",
  "COLETADO",
  "CONCLUIDO",
  "DESCARTADO",
  "LIBERADO P/ DESMONTAR",
  "DESMONTADO",
  "VENDIDO",
];

watch(
  () => form.value.status,
  (newValue) => {
    if (newValue == "PENDENTE") {
      form.value.completion_deadline = null;
    }

    if (newValue == "LIBERADO P/ LAB") {
      form.value.completion_deadline = dayjs().add(15, "days").format("DD/MM/YYYY");
    }

    if (
      ["LIBERADO P/ VENDA", "COLETADO", "CONCLUIDO", "DESCARTADO"].includes(newValue!)
    ) {
      form.value.final_date = dayjs().format("DD/MM/YYYY");
    } else {
      form.value.final_date = null;
    }
  }
);
</script>

<template>
  <UiCombobox v-model="form.status" label="Situação liberação" :items="situation" />
</template>
