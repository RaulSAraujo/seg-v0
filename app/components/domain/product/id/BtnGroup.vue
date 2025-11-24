<script setup lang="ts">
const { $router } = useNuxtApp();

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { params } = useRoute();
</script>

<template>
  <v-btn-toggle variant="plain" color="primary">
    <v-btn
      icon="mdi-home-edit"
      @click="
        $router.replace({
          name: 'product-id',
          params: { id: params.id },
        })
      "
    />

    <ClientOnly v-if="product?.type.toLowerCase() !== 'kit'">
      <v-btn
        text="Tabela de custos"
        :to="{
          name: 'product-id-cost-table',
          params: { id: params.id },
        }"
      />

      <template #fallback>
        <v-skeleton-loader width="150px" color="transparent" type="heading" />
      </template>
    </ClientOnly>

    <v-btn
      text="Tabela de status"
      :to="{
        name: 'product-id-status-table',
        params: { id: params.id },
      }"
    />

    <ClientOnly>
      <v-btn
        v-if="product.type && product.type_id"
        text="Familia/Kit"
        :to="{
          name: 'product-id-type-type_id',
          params: {
            id: params.id,
            type: product.type.toLowerCase(),
            type_id: product.type_id,
          },
        }"
      />

      <template #fallback>
        <v-skeleton-loader width="150px" color="transparent" type="heading" />
      </template>
    </ClientOnly>

    <v-btn
      text="Imagens"
      :to="{
        name: 'product-id-imagens',
        params: { id: params.id },
      }"
    />

    <v-btn
      text="Armazenagem"
      :to="{
        name: 'product-id-storage',
        params: { id: params.id },
      }"
    />
  </v-btn-toggle>
</template>
