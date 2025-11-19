<script setup lang="ts">
import { putInvoiceProduct } from "~/services/product-cost-table.service";

defineOptions({
  name: "ProductCostTableInvoice",
});

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const update = async () => {
  if (!product.value) return;

  try {
    await putInvoiceProduct(product.value);

    $toast().success("Sucesso em salvar informações fiscais do produto.");
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }
};
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.icms_percentage"
        label="Icms percentual"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.diff_icms_percentage"
        label="Diferencial icms percentual"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.ipi_percentage"
        label="Ipi percentagem"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="3" xl="3">
      <UiTextField
        v-model="product.icms_st_percentage"
        label="Icms st percentage"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.freight"
        label="Frete"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.others_cost"
        label="Outros custos"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.icms"
        label="Icms"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.diff_icms"
        label="Diff icms"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.icms_st"
        label="Icms st"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>

    <v-col cols="12" sm="6" md="3" lg="2" xl="2">
      <UiTextField
        v-model="product.ipi"
        label="Ipi"
        :disabled="true"
        :hide-details="true"
      />
    </v-col>
  </v-row>

  <div class="d-flex justify-end mt-2">
    <v-btn color="primary" @click="update"> SALVAR </v-btn>
  </div>
</template>
