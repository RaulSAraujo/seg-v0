<script lang="ts" setup>
import { useOSPaymentsApi } from "~/services/service_order.service/useServiceOrderPaymentsApi";

const Table = defineAsyncComponent(() => import("./table/Index.vue"));
const Creation = defineAsyncComponent(() => import("./creation/Index.vue"));

defineOptions({
  name: "ServiceOrderTabsBudgetFormsOfPayment",
});

const { params } = useRoute();

const { get } = useOSPaymentsApi();

const paymentsStore = useServiceOrderPaymentsStore();

const { data, status } = get(params.id as string, { lazy: true });

onMounted(() => {
  if (status.value == "success" && data.value) {
    paymentsStore.set(data.value);
  }
});
</script>

<template>
  <div>
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">FORMA DE PAGAMENTO</p>

      <Creation />
    </div>

    <Table />
  </div>
</template>
