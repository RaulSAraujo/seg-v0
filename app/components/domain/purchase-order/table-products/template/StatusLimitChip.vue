<script lang="ts" setup>
defineProps<{
  statusLimit: string;
}>();

const colorStatusLimit = (text: string) => {
  const textToColorMap: { [key: string]: string } = {
    "DENTRO DO PRAZO": "green",
    ALERTA: "yellow accent-2",
    EXPIRADO: "pink",
  };

  return textToColorMap[text] || "transparent";
};
</script>

<template>
  <v-chip :color="colorStatusLimit(statusLimit)" size="small">
    {{ statusLimit }}
  </v-chip>
</template>
