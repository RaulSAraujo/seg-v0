<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar title="DETALHES DO PRODUTO" rounded="t-xl" />

    <v-container :fluid="true">
      <ProductSellIdFormDetails />
    </v-container>

    <v-toolbar title="INFORMAÇÕES ADICIONAIS" />

    <v-container :fluid="true">
      <ProductSellIdFormAdditional />
    </v-container>
  </div>
</template>
