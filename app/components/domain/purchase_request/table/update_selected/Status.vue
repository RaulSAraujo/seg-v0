<script lang="ts" setup>
const list = [
  { text: "COMPRAR" },
  { text: "OK" },
  { text: "EM ANDAMENTO" },
  { text: "EM ANÁLISE" },
  { text: "INDISPONIVEL" },
  { text: "FORA DE LINHA" },
  { text: "REJEITADO" },
  { text: "CANCELADO DELTA" },
  { text: "CANCELADO CLIENTE" },
  { text: "IMPORT" },
];
</script>

<template>
  <UiSelect
    label="Status"
    :items="list"
    item-title="text"
    item-value="text"
    attr="status"
  />
</template>
