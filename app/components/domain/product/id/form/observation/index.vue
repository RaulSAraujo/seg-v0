<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
</script>

<template>
  <v-row dense class="mb-3">
    <v-col cols="12">
      <UiTextField
        v-model="product.observation"
        label="Observação"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12">
      <UiTextField
        v-model="product.observation_cod_fab"
        label="Observação do codigo de fabricante"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
