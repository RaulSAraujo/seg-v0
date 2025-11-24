<script lang="ts" setup>
import type { Row } from "~/interfaces/Product";

const emit = defineEmits(["add"]);

const search = ref<Row>();

const form = reactive({
  quantity_purchased: 1,
  quantity_reserved: 1,
  supplier_cost: 0.0,
  purchase_cost: 0.0,
  reservation: "ESTOQUE",
  sending_limit_at: null,
});

const add = () => {
  if (!search.value) return $toast().info("Código de fabricante invalido.");

  emit("add", {
    name: search.value?.name,
    description: search.value?.description,
    erp_product_id: search.value.erp_product_id,
    produto_chave: search.value.produto_chave,
    ...form,
  });

  clear();
};

const clear = () => {
  search.value = undefined;
  form.quantity_purchased = 1;
  form.quantity_reserved = 1;
  form.supplier_cost = 0.0;
  form.purchase_cost = 0.0;
  form.reservation = "ESTOQUE";
  form.sending_limit_at = null;
};
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiFindServer
        v-model="search"
        label="Digite o codigo de fabricante"
        base-url="product"
        param-search="name"
        item-title="name"
        item-value="name"
        :clearable="true"
        :return-object="true"
        :approximate="true"
      />
    </v-col>

    <v-col cols="2">
      <UiNumberInput
        v-model="form.quantity_purchased"
        label="Quantidade compra"
        :min="1"
      />
    </v-col>

    <v-col cols="2">
      <UiNumberInput
        v-model="form.quantity_reserved"
        label="Quantidade finalidade"
        :min="1"
      />
    </v-col>

    <v-col cols="2">
      <UiCurrencyField v-model="form.supplier_cost" label="R$ fornecedor" />
    </v-col>

    <v-col cols="2">
      <UiCurrencyField v-model="form.purchase_cost" label="R$ compra" />
    </v-col>

    <v-col cols="2">
      <div class="d-flex justify-end mr-3">
        <v-btn
          text="ADICIONAR"
          variant="flat"
          color="primary"
          class="mr-1"
          @click="add"
        />

        <v-btn
          text="REDEFINIR"
          variant="outlined"
          color="primary"
          class="ml-1"
          @click="clear"
        />
      </div>
    </v-col>
  </v-row>
</template>
