<script setup lang="ts">
const { $router } = useNuxtApp();

const { params } = useRoute();
</script>

<template>
  <v-btn-toggle variant="plain" color="primary">
    <v-btn
      icon="mdi-home-edit"
      @click="
        $router.replace({
          name: 'product-sell-id',
          params: { id: params.id },
        })
      "
    />

    <v-btn
      text="Histórico de movimentação"
      :to="{
        name: 'product-sell-id-movement-history',
        params: { id: params.id },
      }"
    />

    <v-btn
      text="LOGS"
      :to="{
        name: 'product-sell-id-logs',
        params: { id: params.id },
      }"
    />
  </v-btn-toggle>
</template>
