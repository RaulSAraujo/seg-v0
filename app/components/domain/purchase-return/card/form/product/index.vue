<script lang="ts" setup>
import Type from "./Type.vue";
import Warehouse from "./Warehouse.vue";
import SelectProduct from "./SelectProduct.vue";

const { params } = useRoute();

const purchaseReturnStore = usePurchaseReturnStore();
const { form, formProduct } = storeToRefs(purchaseReturnStore);
</script>

<template>
  <v-row dense>
    <v-col v-if="!params.id" cols="12" sm="6" lg="2">
      <SelectProduct />
    </v-col>

    <v-col v-else cols="12" sm="6" lg="2">
      <UiTextField
        v-model="formProduct.name"
        label="Codigo de fabricante"
        disabled
      />
    </v-col>

    <v-col cols="12" sm="6" lg="4">
      <UiTextField
        v-model="formProduct.description"
        label="Descrição"
        disabled
      />
    </v-col>

    <v-col cols="12" sm="4" lg="2">
      <UiNumberInput
        v-model="form.returning_quantity"
        label="Quantidade"
        :min="1"
      />
    </v-col>

    <v-col cols="12" sm="4" lg="2">
      <Warehouse v-model="form.warehouse" />
    </v-col>

    <v-col cols="12" sm="4" lg="2">
      <Type v-model="form.type" />
    </v-col>
  </v-row>
</template>
