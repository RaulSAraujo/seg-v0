<script lang="ts" setup>
import type { Header } from "~/interfaces/Header";
import type { Row } from "~/interfaces/SalesOrderSeparation";
import { getOrdersByTypeSalesOrderSeparation } from "~/services/separation-requests.service";

defineOptions({
  name: "SeparationRequestsStatusDialog",
});

const props = defineProps<{
  status: string;
}>();

const { brDate } = useDateConversion();

const listOrders = ref<Row[]>([]);
const loading = ref(false);

const headers = ref<Header[]>([
  { title: "Tray", key: "sale_id_ecom" },
  { title: "Erp", key: "sale_id_erp" },
  { title: "Almoxarifado", key: "warehouse", align: "center" },
  { title: "Empresa", key: "company", align: "center" },
  { title: "Verificado", key: "validated", align: "center" },
  { title: "Criado em", key: "created_at" },
]);

const fetchOrders = async () => {
  try {
    loading.value = true;

    const res = await getOrdersByTypeSalesOrderSeparation(props.status);

    listOrders.value = res;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.status,
  (newStatus) => {
    if (newStatus) {
      fetchOrders();
    } else {
      listOrders.value = [];
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="860px">
    <v-card rounded="xl">
      <template #text>
        <v-data-table
          :items="listOrders"
          item-key="id"
          :headers="headers"
          hide-default-footer
          disable-sort
          items-per-page="-1"
          density="compact"
          :loading="loading"
        >
          <template #item.validated="{ item }">
            <UiCheckIcon :value="item.validated" readonly />
          </template>

          <template #item.created_at="{ item }">
            {{ brDate(`${item.created_at}`) }}
          </template>
        </v-data-table>
      </template>
    </v-card>
  </v-dialog>
</template>
