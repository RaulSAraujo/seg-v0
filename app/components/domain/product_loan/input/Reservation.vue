<script lang="ts" setup>
const reservations = [
  { text: "SUPORTE" },
  { text: "TIRAR FOTO" },
  { text: "ANUNCIAR E TIRAR FOTO" },
  { text: "TESTE" },
  { text: "ENVIO AO CLIENTE" },
  { text: "DESMEMBRADA" },
];
</script>

<template>
  <UiSelect label="Finalidade" :items="reservations" item-title="text" item-value="text" />
</template>
