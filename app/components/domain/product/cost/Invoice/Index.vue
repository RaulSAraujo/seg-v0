<script setup lang="ts">
import { updateProduct } from "~/services/product.service";

defineOptions({
  name: "ProductCostTableInvoice",
});

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const loading = ref(false);

const update = async () => {
  if (!product.value) return;

  loading.value = true;
  
  const res = await updateProduct({
    id: product.value.id,
    icms_percentage: product.value.icms_percentage,
    diff_icms_percentage: product.value.diff_icms_percentage,
    ipi_percentage: product.value.ipi_percentage,
    icms_st_percentage: product.value.icms_st_percentage,
    freight: product.value.freight,
    others_cost: product.value.others_cost,
    icms: product.value.icms,
    diff_icms: product.value.diff_icms,
    icms_st: product.value.icms_st,
    ipi: product.value.ipi,
  });

  if (res) {
    $toast().success("Sucesso em salvar informações fiscais do produto.");
  }

  loading.value = false;
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
    <v-btn color="primary" @click="update" :loading="loading"> SALVAR </v-btn>
  </div>
</template>
