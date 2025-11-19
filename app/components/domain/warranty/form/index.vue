<script lang="ts" setup>
import Submit from "./Submit.vue";
import Products from "./Products.vue";
import Details from "./details/index.vue";
import InitialValues from "./InitialValues.vue";
import ReversalAndReturn from "./reversal_return/index.vue";

import type { RowWithRelationship } from "~/interfaces/Warranty";
import { trayCommerceGetOrderLink } from "~/services/warranty.service";

defineOptions({
  name: "WarrantyCreation",
});

const props = defineProps<{
  title: string;
  disabledProducts?: boolean;
  orders: RowWithRelationship;
  activeRedirectTray?: boolean;
  methodsRest: "POST" | "PUT";
}>();

defineEmits(["setOrders"]);

const loading = useLoadingIndicator();

const ordersComputed = computed(() => props.orders);

const initialValuesRef = ref();
watch(
  () => initialValuesRef.value,
  () => {
    if (props.methodsRest === "POST") return;

    initialValuesRef.value.idWarranty = ordersComputed.value?.garantia;
  }
);

const redirectTray = async () => {
  try {
    loading.start();

    const url = await trayCommerceGetOrderLink(ordersComputed.value?.garantia);

    window?.open(`${url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-sheet
    class="mx-2 elevation-0 pb-8"
    rounded="xl"
    elevation="5"
    color="transparent"
  >
    <div class="mb-2 d-flex justify-space-between">
      <span class="text-h6 text-primary text-uppercase font-weight-black">
        {{ title }}
      </span>

      <v-btn
        v-if="activeRedirectTray"
        text="TRAY"
        append-icon="mdi-cart"
        variant="plain"
        @click="redirectTray"
      />
    </div>

    <InitialValues
      ref="initialValuesRef"
      :orders="ordersComputed"
      :disabled="props.methodsRest === 'PUT'"
      @update-orders="$emit('setOrders', $event)"
    />

    <Products
      :warranty-rma-products="ordersComputed.WarrantyRmaProducts"
      :valor-total="ordersComputed.valor_total"
      :disabled="disabledProducts || false"
    />

    <Details :orders="ordersComputed" />

    <ReversalAndReturn :orders="ordersComputed" />

    <div class="mt-5 mb-2">
      <span class="text-h6">DADOS BANCÁRIOS</span>
    </div>

    <UiTextArea v-model="ordersComputed.bank_data" auto-grow />

    <Submit :method-rest="methodsRest" :orders="ordersComputed" />
  </v-sheet>
</template>
