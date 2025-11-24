<script lang="ts" setup>
defineOptions({
  name: "OrderImportTableStatusChip",
});

defineProps<{
  status: string;
}>();

const color = (status: string) => {
  if (status == "EM RECEBIMENTO") return "green-accent-2";
  else if (status == "EM ABERTO") return "indigo";
  else if (status == "CANCEL. FORN") return "pink";
  else if (status == "LIBERADO") return "green";
  else if (status == "REJEITADO") return "purple";
  else if (status == "CANCEL. DELTA") return "red";
  else if (status == "PERDA") return "red-darken-3";
  else if (status == "PENDENTE") return "orange-darken-3";
  else return "transparent";
};
</script>

<template>
  <v-chip size="small" :text="status" :color="color(status)" />
</template>
