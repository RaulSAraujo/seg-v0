<script lang="ts" setup>
import type {
  ImportOrdersProduct,
  Form,
} from "~/interfaces/ImportOrders";

useHead({
  titleTemplate: `Novo Pedido importação - %s`,
});

definePageMeta({
  path: "/pedido-importacao/criar",
});

const form = reactive<Form>({} as Form);

const items = ref<ImportOrdersProduct[]>([]);
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para pedido importação"
        :to="{
          name: 'order-import',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar title="CRIAR PEDIDO IMPORTAÇÃO" rounded="t-xl" class="mb-5" />

      <v-row dense class="px-3">
        <v-col cols="3">
          <UiTextField v-model="form.erp_order" label="Pedido erp" />
        </v-col>

        <v-col cols="3">
          <OrderImportCreationPurchaseAccount v-model="form.purchase_account" />
        </v-col>

        <v-col cols="3">
          <UiTextField v-model="form.supplier" label="Fornecedor" />
        </v-col>

        <v-col cols="3">
          <UiTextField
            v-model="form.observation"
            label="Observação do pedido"
          />
        </v-col>
      </v-row>

      <OrderImportCreationForm
        :items="items"
        @add="items.splice(0, 0, $event)"
      />

      <OrderImportCreationSubmit :form="form" :items="items" />
    </v-sheet>
  </div>
</template>
