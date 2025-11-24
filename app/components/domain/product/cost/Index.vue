<script setup lang="ts">
import { createDefaultProductQuotation } from "~/factories/productFactory";

defineOptions({
  name: "ProductCostTable",
});

const productStore = useProductStore();
const { product, availabilityMap, productQuotations, productFamily } =
  storeToRefs(productStore);

const productQuotation = computed(() =>
  createDefaultProductQuotation(productQuotations.value[0])
);

const supplierName = computed(
  () => productQuotation.value.Supplier?.name ?? ""
);
</script>

<template>
  <v-row dense class="mb-2">
    <v-col cols="12" sm="6" md="4" lg="3" xl="3">
      <UiTextField
        v-model="supplierName"
        outlined
        label="Fornecedor preferencial"
        disabled
        dense
      />
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="2" xl="2">
      <UiCurrencyField
        v-model="productQuotation.cost"
        label="Custo (fornecedor pref.)"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="2" xl="2">
      <UiCurrencyField
        v-model="product.cost"
        label="Custo (produto)"
        :hide-details="true"
        :disabled="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="2" xl="2">
      <UiTextField
        v-model="productFamily.quantity"
        label="Quantidade minima compra"
        :disabled="true"
      />
    </v-col>

    <v-col cols="12" sm="12" md="6" lg="3" xl="3">
      <UiSelect
        v-model="product.availability"
        label="Disponibilidade"
        :items="availabilityMap"
        item-title="title"
        item-value="value"
        :multiple="false"
        :disabled="true"
      />
    </v-col>
  </v-row>
</template>
