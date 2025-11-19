<script lang="ts" setup>
const parameters = ref(["INDICADOR", "MARCA"]);
</script>

<template>
  <UiSelect label="Parâmetro" :items="parameters" :multiple="false" />
</template>
