<script lang="ts" setup>
import Add from "./Add.vue";
import Reset from "./Reset.vue";

import type { Row } from "~/interfaces/Product";
import type { Form } from "~/interfaces/PurchaseRequest";

defineOptions({
  name: "PurchaseRequestCreationForm",
});

const emit = defineEmits(["submit"]);

const { $dayjs } = useNuxtApp();

const getInitialForm = () => {
  return {
    quantity_purchased: 1,
    quantity_reserved: 1,
    cost: 0.0,
    reservation: "",
    sending_limit_at: undefined,
  };
};

const refFindServer = ref();
const product = ref<Row>({} as Row);
const form = ref<Form>(getInitialForm());

const submit = (event: Form & { name: string; description: string }) => {
  emit("submit", event);

  clear();
};

const clear = () => {
  product.value = {} as Row;
  refFindServer.value.clear();
  form.value = getInitialForm();
};
</script>

<template>
  <div>
    <v-row dense justify="space-between" class="px-3 mb-2">
      <v-col cols="12" md="4" lg="3">
        <PurchaseRequestCreationFindServer
          ref="refFindServer"
          @change="product = $event"
        />
      </v-col>

      <v-col cols="6" md="4" lg="1">
        <UiNumberInput
          v-model="form.quantity_purchased"
          label="Quantidade comprada"
          :min="1"
        />
      </v-col>

      <v-col cols="6" md="4" lg="1">
        <UiNumberInput
          v-model="form.quantity_reserved"
          label="Quantidade finalidade"
          :min="1"
        />
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <UiTextField v-model="form.reservation" label="Finalidade" />
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <UiCurrencyField v-model="form.cost" label="Custo fornecedor" />
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <UiDatePicker
          v-model="form.sending_limit_at"
          label="Data limite"
          :multiple="false"
          :clearable="true"
          @save="form.sending_limit_at = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-end mr-3">
      <Reset @clear="clear" />

      <Add :form="form" :product="product" @submit="submit" />
    </div>
  </div>
</template>
