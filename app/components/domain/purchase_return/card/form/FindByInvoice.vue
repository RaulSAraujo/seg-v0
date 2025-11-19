<script lang="ts" setup>
import type { ProductsByInvoice } from "~/interfaces/PurchaseReturn";

const { $customFetch } = useNuxtApp();

const invoice = ref("");

const loading = ref(false);

const purchaseReturnStore = usePurchaseReturnStore();
const { form, products } = storeToRefs(purchaseReturnStore);

const { isDatabaseDate, brDate } = useDateConversion();

const findByInvoice = async () => {
  try {
    loading.value = true;

    const res = await $customFetch<ProductsByInvoice>(
      "purchase-return/get-products-by-invoice",
      {
        query: {
          invoice_number: invoice.value,
        },
      }
    );

    if (isDatabaseDate(res.invoice_issuance_date ?? "")) {
      form.value.invoice_issuance_date = brDate(
        res.invoice_issuance_date ?? ""
      );
    }

    form.value.supplier = res.supplier;

    products.value = res.PurchaseControlProducts;

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <UiTextField
    v-model="invoice"
    label="Nota fiscal"
    @keyup.enter="findByInvoice"
  >
    <template #append-inner>
      <v-btn
        icon="mdi-magnify"
        density="compact"
        :loading="loading"
        @click="findByInvoice()"
      />
    </template>
  </UiTextField>
</template>
