<script lang="ts" setup>
import Add from "./Add.vue";
import Submit from "./Submit.vue";
import Table from "./table/index.vue";
import Metrics from "./metrics/index.vue";
import Supplier from "./input/Supplier.vue";
import ImportExcel from "./ImportExcel.vue";

import type { Form } from "~/interfaces/PurchaseControl";
import type { Row } from "~/interfaces/PurchaseControlProduct";

defineOptions({
  name: "PurchaseOrderCreationForm",
});

const props = defineProps<{
  title: string;
  form: Form;
  products: Row[];
  methodRest: "POST" | "PUT";
}>();

defineEmits(["loading", "set-value-loading", "errors"]);

const formComputed = computed(() => props.form);
const productsComputed = computed(() => props.products);
</script>

<template>
  <div class="mx-4" elevation="5" color="transparent">
    <div class="mb-5">
      <span class="text-h5 text-primary text-uppercase font-weight-black">{{
        title
      }}</span>
    </div>

    <v-row dense>
      <v-col cols="12" sm="3" md="3" lg="2" xl="2">
        <UiTextField
          v-model="formComputed.supplier_order"
          label="Pedido fornecedor"
        />
      </v-col>

      <v-col cols="12" sm="3" md="3" lg="2" xl="2">
        <UiTextField v-model="formComputed.erp_order" label="Pedido erp" />
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <UiTextField
          v-model="formComputed.description"
          label="Descrição pedido"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="2" xl="2">
        <Supplier v-model="formComputed.supplier" />
      </v-col>

      <v-col cols="12">
        <UiTextArea v-model="formComputed.observation" label="Observação" />
      </v-col>
    </v-row>

    <div class="d-flex justify-space-between mt-4">
      <span class="text-h6 text-primary font-weight-black">
        IMPORTAR ARQUIVO EXCEL
      </span>

      <ImportExcel @add="productsComputed.push($event)" />
    </div>

    <Metrics :products="productsComputed" />

    <Add class="my-4" @add="productsComputed.splice(0, 0, $event)" />

    <Table
      :products="productsComputed"
      @remove="productsComputed.splice($event, 1)"
    />

    <Submit
      :method-rest="methodRest"
      :form="form"
      :products="products"
      @loading="$emit('loading', $event)"
      @set-value-loading="$emit('set-value-loading', $event)"
      @errors="$emit('errors', $event)"
    />
  </div>
</template>
