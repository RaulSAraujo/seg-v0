<script setup lang="ts">
import type {
  PurchaseControlProduct,
  Row,
} from "~/interfaces/PurchaseControlProduct";

useHead({
  titleTemplate: `Recebimento - %s`,
});

definePageMeta({
  path: "/recebimento",
});

const { $customFetch, $dayjs } = useNuxtApp();
const { isDate, databaseDate } = useDateConversion();

interface Form {
  invoice?: string;
  receiving_at?: string;
  status?: boolean;
  supplier?: string;
}

const items = ref<Row[]>([]);
const loading = ref(false);

const form = reactive<Form>({
  invoice: undefined,
  receiving_at: undefined,
  status: false,
  supplier: undefined,
});

const listSupplier = [
  "ALADO",
  "KLIMASA",
  "ENVISION",
  "TCL",
  "CP",
  "PHILCO-BRITANIA",
  "SAMSUNG",
  "ELECTROLUX",
  "WHIRLPOOL",
  "LG",
  "ELGIN",
];

const search = async () => {
  try {
    loading.value = true;

    const validation = Object.values(form).every(
      (e) => e == undefined || e == "" || e == false
    );

    if (validation) {
      loading.value = false;

      return;
    }

    const { rows } = await $customFetch<PurchaseControlProduct>(
      "receivement/purchase-control-product",
      {
        query: {
          status: form.status ? "EM RECEBIMENTO,PROCESSANDO" : undefined,
          invoice: form.invoice,
          supplier: form.supplier,
          receiving_at: isDate(form.receiving_at!)
            ? databaseDate(form.receiving_at!)
            : form.receiving_at,
        },
      }
    );

    items.value = rows;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const clear = () => {
  form.invoice = undefined;
  form.receiving_at = undefined;
  form.status = undefined;
  form.supplier = undefined;

  items.value = [];
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">RECEBIMENTO</span>

    <v-row dense class="px-4 my-5">
      <v-col cols="2">
        <UiSelect
          v-model="form.supplier"
          label="Fornecedor"
          :items="listSupplier"
        />
      </v-col>

      <v-col cols="2">
        <UiTextField v-model="form.invoice" label="Nº NFe" />
      </v-col>

      <v-col cols="2">
        <UiDatePicker
          v-model="form.receiving_at"
          label="Data recebimento"
          :multiple="false"
          :clearable="true"
          @save="form.receiving_at = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>

      <v-col cols="2">
        <v-switch
          id="filter-receipt"
          v-model="form.status"
          inset
          label="FILTRAR EM RECEBIMENTO"
          color="primary"
          density="compact"
          class="ml-5"
          hide-details
        />
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-end mr-5 mb-5">
      <div>
        <v-btn text="Buscar" color="primary" class="mr-2" @click="search" />

        <v-btn
          text="Limpar filtros"
          variant="outlined"
          color="primary"
          @click="clear"
        />
      </div>
    </div>

    <ReceiptTable :items="items" :loading="loading" />

    <ReceiptBottomSheet :items="items" :form="form" />

    <ReceiptSetOrderReceivement :items="items" />
  </div>
</template>
