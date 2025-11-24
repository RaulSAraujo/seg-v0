<script lang="ts" setup>
defineOptions({
  name: "OrderMlTableStatusChip",
});

defineProps<{
  status: string;
}>();

const color = (status: string) => {
  if (status === "EM ABERTO") return "teal";
  else if (status === "AGUARDANDO APROVAÇÃO") return "lime";
  else if (status === "DEVOLUÇÃO") return "orange";
  else if (status === "DEVOLVIDO") return "orange lighten-1";
  else if (status === "CANC DELTA/FORNC") return "red";
  else if (status === "LIBERADO") return "blue";
  else return "transparent";
};
</script>

<template>
  <v-chip size="small" :text="status" :color="color(status)" />
</template>
