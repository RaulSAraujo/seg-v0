<script lang="ts" setup>
defineOptions({
  name: "InsumosStatusChip",
});

defineProps<{
  text: string;
}>();

const color = (text: string) => {
  if (text === "EM ABERTO") return "teal";
  else if (text === "EM ANDAMENTO") return "lime";
  else if (text === "COMPRADO") return "green";
  else if (text === "CANCEL DELTA") return "red";
  else if (text === "CANCEL FORN") return "pink";
  else if (text === "LIBERADO") return "blue";
  else return "deep-orange";
};
</script>

<template>
  <v-chip size="small" :text="text" :color="color(text)" />
</template>
