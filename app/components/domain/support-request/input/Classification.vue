<script lang="ts" setup>
const classificationList = ref(["BUG", "MELHORIA", "NOVO RECURSO"]);
</script>

<template>
  <UiSelect label="Classificação" :items="classificationList" />
</template>
