<script lang="ts" setup>
import type { Row } from "~/interfaces/Product";

defineOptions({
  name: "OrderImportCreationFormProducts",
});

const emit = defineEmits(["add"]);

const search = ref<Row>();

const form = ref({
  total_cost: 0.0,
  quantity_purchased: 1,
  reserved_quantity: 1,
  reservation: "ESTOQUE",
  form_of_payment: "BOLETO",
  platform_order_number: "",
});

const repeat = ref(1);

const add = () => {
  if (!search.value) return $toast().info("Codigo de fabricante invalido.");

  for (let index = 0; index < repeat.value; index++) {
    emit("add", {
      name: search.value?.name,
      description: search.value?.description,
      ...form.value,
    });
  }

  clear();
};

const clear = () => {
  search.value = undefined;

  form.value.total_cost = 0.0;

  form.value.quantity_purchased = 1;

  form.value.reserved_quantity = 1;

  form.value.reservation = "ESTOQUE";

  form.value.form_of_payment = "BOLETO";

  repeat.value = 1;
};
</script>

<template>
  <v-row dense class="px-3">
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
      />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.reservation" label="Finalidade" />
    </v-col>

    <v-col cols="1">
      <UiNumberInput
        v-model="form.quantity_purchased"
        label="Quant. comprada"
        :min="1"
      />
    </v-col>

    <v-col cols="1">
      <UiNumberInput
        v-model="form.reserved_quantity"
        label="Quant. finalidade"
        :min="1"
      />
    </v-col>

    <v-col cols="1">
      <UiCurrencyField v-model="form.total_cost" label="Custo total" />
    </v-col>

    <v-col cols="2">
      <OrderImportCreationFormPaymentMethod v-model="form.form_of_payment" />
    </v-col>

    <v-col cols="1">
      <UiNumberInput v-model="repeat" label="Repetir" :min="1" />
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
