<script lang="ts" setup>
import { useErpSituationApi } from "../../composables/useErpSituationApi";

const Tat = defineAsyncComponent(() => import("./template/Tat.vue"));
const Type = defineAsyncComponent(() => import("./template/Type.vue"));
const Region = defineAsyncComponent(() => import("./template/Region.vue"));
const Status = defineAsyncComponent(() => import("./template/Status.vue"));
const ServiceMode = defineAsyncComponent(
  () => import("./template/ServiceMode.vue")
);

defineOptions({
  name: "ServiceOrderTable",
});

const { $dayjs } = useNuxtApp();

const { data, status } = useErpSituationApi({ lazy: true });
</script>

<template>
  <UiTable
    :multi-sort="true"
    :others-query="{
      full: false,
    }"
  >
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        density="compact"
        :to="{
          name: 'service-order-id',
          params: { id: item.id },
        }"
      />

      <UiDelete :id="item.id" />
    </template>

    <template #item.tat="{ item }">
      <Tat
        :created-at="item.created_at"
        :close-order-at="item.close_order_at ?? $dayjs().toISOString()"
      />
    </template>

    <template #item.region="{ item }">
      <Region :text="item.region" />
    </template>

    <template #item.service_mode="{ item }">
      <ServiceMode :text="item.service_mode" />
    </template>

    <template #item.type="{ item }">
      <Type :value="item.type" />
    </template>

    <template #item.status="{ item }">
      <Status
        :is-loading="status == 'success'"
        :erp-situation="data || []"
        :value="item.status"
      />
    </template>

    <template #item.city="{ item }">
      <UiTooltip :text="item.Client?.ClientsAddresses[0]?.city ?? ''" :vw="5" />
    </template>

    <template #item.total_value="{ item }">
      <UiToLocaleString :value="item.total_value" />
    </template>

    <template #item.total_value_products="{ item }">
      <UiToLocaleString :value="item.total_value_products" />
    </template>

    <template #item.total_value_services="{ item }">
      <UiToLocaleString :value="item.total_value_services" />
    </template>

    <template #item.discount_value="{ item }">
      <UiToLocaleString :value="item.discount_value" />
    </template>

    <template #item.apparatus_value="{ item }">
      <UiToLocaleString :value="item.apparatus_value" />
    </template>

    <template #item.erp_client_id="{ item }">
      <UiTooltip :text="item.Client.name" :vw="5" />
    </template>
  </UiTable>
</template>
