<script lang="ts" setup>
const reasons = ref(["VISITA", "COLETA", "ENTREGA", "INTERNO", "REPARO"]);
</script>

<template>
  <UiSelect label="Motivo" :items="reasons" />
</template>
