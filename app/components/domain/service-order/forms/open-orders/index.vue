<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { openOrders } = storeToRefs(serviceOrderStore);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Nº Ordem de serviço", key: "service_order_id" },
  { title: "Redirect", key: "redirect", align: "center" },
]);
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300px">
    <template #activator="{ props: dialog }">
      <v-btn
        v-if="openOrders.length > 0"
        v-bind="dialog"
        variant="text"
        color="red"
        width="50"
        height="50"
        style="position: absolute; top: 135px; right: 40px"
      >
        <v-icon icon="mdi-alert" size="50" />
      </v-btn>
    </template>

    <template #default>
      <v-card title="ORDENS DE SERVIÇO" rounded="xl">
        <v-data-table
          :items="openOrders"
          :headers="headers"
          height="20vh"
          items-per-page="-1"
          disable-sort
          hide-default-footer
        >
          <template #item.redirect="{ item }">
            <v-btn
              icon="mdi-open-in-new"
              variant="plain"
              target="_blank"
              size="small"
              color="primary"
              :to="{
                name: 'service-order-id',
                params: {
                  id: item.service_order_id,
                },
              }"
            />
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-dialog>
</template>
