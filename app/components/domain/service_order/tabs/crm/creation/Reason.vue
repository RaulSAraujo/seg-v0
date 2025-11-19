<script lang="ts" setup>
const reason = ref(["COLETAR: PEÇA NOVA", "COLETAR: PEÇA USADA", "LIBERADO"]);
</script>

<template>
  <UiSelect label="Motivo" :items="reason" />
</template>
