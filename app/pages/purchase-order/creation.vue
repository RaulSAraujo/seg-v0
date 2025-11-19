<script lang="ts" setup>
import type { Form as FormProps } from "~/interfaces/PurchaseControl";
import type { Row } from "~/interfaces/PurchaseControlProduct";

useHead({
  titleTemplate: `Novo pedido de compra - %s`,
});

definePageMeta({
  path: "/pedido-de-compra/criar",
});

const form = reactive<FormProps>({
  id: undefined,
  erp_order: "",
  description: "",
  supplier: null,
  supplier_order: "",
  observation: "",
});

const loading = ref(false);
const setValueLoading = ref(0);
const products = ref<Row[]>([]);

const openErrors = ref(false);
const errors = ref<Row[]>([]);

const openError = (event: Row[]) => {
  errors.value = event;

  openErrors.value = true;
};
</script>

<template>
  <div>
    <v-progress-linear
      v-if="loading"
      v-model="setValueLoading"
      color="primary"
    />

    <div class="my-5">
      <div class="d-flex flex-row mb-2">
        <v-btn
          variant="plain"
          prepend-icon="mdi-arrow-left"
          text="Voltar para pedido de compra"
          :to="{
            name: 'purchase-order',
          }"
        />
      </div>

      <PurchaseOrderForm
        title="Criar pedido de compra"
        :form="form"
        method-rest="POST"
        :products="products"
        @loading="loading = $event"
        @errors="openError($event)"
        @set-value-loading="setValueLoading = $event"
      />

      <PurchaseOrderErrorList v-model="openErrors" :items="errors" />
    </div>
  </div>
</template>
