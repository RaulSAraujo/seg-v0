<script lang="ts" setup>
const types = ref([
  {
    text: "TEXTO",
    value: "STRING",
  },
  {
    text: "NUMÉRICO",
    value: "INTEGER",
  },
  {
    text: "VALOR MONETÁRIO",
    value: "FLOAT",
  },
  {
    text: "VERDADEIRO/FALSO",
    value: "BOOLEAN",
  },
  {
    text: "DATA",
    value: "DATE",
  },
  {
    text: "LISTA",
    value: "ARRAY",
  },
]);
</script>

<template>
  <UiSelect
    label="Selecione o tipo do campo"
    :items="types"
    item-title="text"
    item-value="value"
    :multiple="false"
    :return-object="false"
    :clearable="true"
  />
</template>
