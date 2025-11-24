<script lang="ts" setup>
const list = [
  { text: "EM ABERTO", color: "indigo" },
  { text: "EM RECEBIMENTO", color: "green accent-2" },
  { text: "LIBERADO", color: "green" },
  { text: "PREVISÃO FUTURA", color: "yellow accent-2" },
  { text: "CANCEL. FORN", color: "pink" },
  { text: "CANCEL. DELTA", color: "red" },
  { text: "EXPEDIÇÃO", color: "blue" },
  { text: "PENDENTE", color: "light-blue" },
  { text: "AVARIADO", color: "light-green" },
  { text: "DIFERENTE", color: "lime" },
  { text: "REJEITADO", color: "purple" },
  { text: "EXTRAVIADO", color: "brown" },
  { text: "DEVOLVER", color: "deep-purple" },
  { text: "DEVOLUÇÃO OK", color: "teal" },
  { text: "TROCAR", color: "orange" },
  { text: "REALOCAÇÃO", color: "amber" },
  { text: "PARCIAL", color: "deep-orange" },
];
</script>

<template>
  <UiCombobox label="Status" :items="list" item-title="text" item-value="text" clearable />
</template>
