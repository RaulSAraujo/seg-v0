<script setup lang="ts">
import IdPackage from "./inputs/IdPackage.vue";
import PackageWeight from "./inputs/PackageWeight.vue";
import GrossWeight from "./inputs/GrossWeight.vue";
import WeightCubic from "./inputs/WeightCubic.vue";

const productStore = useProductStore();
const { product, productMeasurementsChanged } = storeToRefs(productStore);
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <IdPackage />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.weight"
        v-maska="'N'"
        label="Peso liquido (g)"
        :hide-details="true"
        @update:model-value="productMeasurementsChanged = true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <PackageWeight />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <GrossWeight />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <WeightCubic />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.height"
        label="Altura (cm)"
        :disabled="product.package_id != 1"
        @update:model-value="productMeasurementsChanged = true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.width"
        label="Largura (cm)"
        :disabled="product.package_id != 1"
        @update:model-value="productMeasurementsChanged = true"
      />
    </v-col>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.length"
        label="Comprimento (cm)"
        :disabled="product.package_id != 1"
        @update:model-value="productMeasurementsChanged = true"
      />
    </v-col>
  </v-row>
</template>
