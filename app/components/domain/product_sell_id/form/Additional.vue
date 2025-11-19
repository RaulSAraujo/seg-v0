<script setup lang="ts">
defineOptions({
  name: "ProductSellAdditional",
});

const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);
</script>

<template>
  <v-row dense justify="space-around" class="mt-3">
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <UiTextField
        :model-value="product!.CategoryEcom"
        label="Categoria ecom"
        :disabled="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <UiSwitch
        v-model="product!.featured_seal"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Destaque produto"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <UiSwitch
        v-model="product!.release_seal"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Lançamento produto"
        :hide-details="true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <UiSwitch
        v-model="product!.additional_seal"
        class="d-flex flex-row justify-center border-sm rounded-lg"
        label="Selo adicional"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
