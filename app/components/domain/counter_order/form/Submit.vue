<script setup lang="ts">
import type { Row } from "~/interfaces/CounterOrder";

defineOptions({
  name: "CounterOrderSubmit",
});

const router = useRouter();
const { params } = useRoute();
const loading = useLoadingIndicator();
const { $customFetch } = useNuxtApp();

const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);

const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const { payments } = storeToRefs(counterOrderPaymentsStore);

const counterOrderProductsStore = useCounterOrderProductsStore();
const { products, totalValueProducts } = storeToRefs(counterOrderProductsStore);

const totalValue = computed(
  () => totalValueProducts.value - form.value.discount
);

const save = async () => {
  try {
    loading.start();

    const { id } = await $customFetch<Row>("counter-order", {
      method: params.id ? "PUT" : "POST",
      body: {
        id: params.id ?? undefined,
        client_id: customerData.value.id,
        status: form.value.status,
        attendance_type: form.value.attendance_type,
        budget_status: form.value.budget_status,
        total_value: totalValue.value,
        discount: form.value.discount,
      },
    });

    if (!params.id) {
      if (products.value.length > 0) {
        products.value.forEach(async (product) => {
          product.counter_order_id = id;

          await $customFetch("counter-order/counter-order-products", {
            method: "POST",
            body: product,
          });
        });
      }

      if (payments.value.length > 0) {
        payments.value.forEach(async (payment) => {
          payment.counter_order_id = id;

          await $customFetch("counter-order/counter-order-payments", {
            method: "POST",
            body: payment,
          });
        });
      }

      $toast().success("Sucesso em criar o pedido balcão");

      router.push({ name: "counter-order" });
    } else {
      $toast().success("Sucesso em editar o pedido balcão");
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: absolute; bottom: 30px; right: 14px"
    @click="save"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
