<script lang="ts" setup>
const modelStore = useModelStore();
const { models } = storeToRefs(modelStore);
</script>

<template>
  <UiCombobox
    label="Nome da tela"
    :items="models || []"
    item-title="page_title"
    item-value="entity_name"
    :multiple="false"
    :clearable="true"
  />
</template>
