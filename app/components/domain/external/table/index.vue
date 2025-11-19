<script lang="ts" setup>
import { useErpSituationApi } from "~/composables/service_order/useErpSituationApi";

import type { Row } from "~/interfaces/GeneralReport";

defineOptions({
  name: "ExternalTable",
});

defineProps<{
  items: Row[];
  loading: boolean;
}>();

const { $dayjs } = useNuxtApp();

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
  sortable?: boolean;
};

const headers: Header[] = [
  { title: "Ações", key: "action", align: "center", sortable: false },
  { title: "Região", key: "region", align: "center" },
  { title: "Cidade", key: "city" },
  { title: "OS", key: "id" },
  { title: "Tipo", key: "type", align: "center" },
  { title: "Marca", key: "supplier" },
  { title: "GE", key: "extended_warranty" },
  { title: "Modelo", key: "model" },
  { title: "Situação", key: "status", align: "center" },
  { title: "Data abertura", key: "created_at" },
  { title: "Aparelho na ASC", key: "apparatus_collected", align: "center" },
  { title: "Tat", key: "tat", align: "center", sortable: false },
];

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const { data, status } = useErpSituationApi({ lazy: true });
</script>

<template>
  <ClientOnly>
    <v-data-table
      v-model="selected"
      show-select
      :headers="headers"
      :items="items"
      :loading="loading"
      density="compact"
      class="mb-5"
      items-per-page="-1"
      hide-default-footer
      return-object
    >
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-home-export-outline"
          variant="plain"
          size="small"
          color="blue"
          density="compact"
          target="_blank"
          :to="{
            name: 'service-order-id',
            params: { id: item.id },
          }"
        />
      </template>

      <template #item.tat="{ item }">
        <ServiceOrderTableTemplateTat
          :created-at="`${item.created_at}`"
          :close-order-at="`${item.close_order_at ?? $dayjs().toISOString()}`"
        />
      </template>

      <template #item.region="{ item }">
        <ServiceOrderTableTemplateRegion :text="item.region" />
      </template>

      <template #item.type="{ item }">
        <ServiceOrderTableTemplateType :value="item.type" />
      </template>

      <template #item.status="{ item }">
        <ServiceOrderTableTemplateStatus
          v-if="status == 'success'"
          :erp-situation="data ?? []"
          :value="item.status"
        />
      </template>

      <template #item.city="{ item }">
        <UiTooltip :text="item.city" :vw="5" />
      </template>

      <template #item.apparatus_collected="{ item }">
        <UiCheckIcon :value="item.apparatus_collected" :readonly="true" />
      </template>

      <template #item.created_at="{ item }">
        <UiDateString :date="item.created_at" />
      </template>
    </v-data-table>

    <UiBottomSheet />
  </ClientOnly>
</template>

<style>
.v-theme--dark .v-data-table thead {
  background-color: #3c3c3cb0;
}

.v-theme--light .v-data-table thead {
  background-color: #eeeeee;
}
</style>
