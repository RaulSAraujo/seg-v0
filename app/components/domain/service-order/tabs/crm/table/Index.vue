<script lang="ts" setup>
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";

defineOptions({
  name: "ServiceOrderTabsCrmTable",
});

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Ações", key: "actions" },
  { title: "Data", key: "created_at" },
  { title: "Motivo", key: "status" },
  { title: "Produtos", key: "products" },
  { title: "Observação", key: "observation" },
  { title: "Origem", key: "user" },
  { title: "Destino", key: "target_user" },
  { title: "Validado", key: "validated", align: "center" },
];

const { remove } = useOSInternalObsApi();

const internalObsStore = useServiceOrderInternalObsStore();
const { internalObservations } = storeToRefs(internalObsStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="internalObservations"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
  >
    <template #item.actions="{ item }">
      <UiDelete
        :disabled="!item.is_manual"
        function-external
        @remove="remove(item.id)"
      />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString
        :date="item.created_at"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>

    <template #item.user="{ item }">
      {{ item.User.name }}
    </template>

    <template #item.products="{ item }">
      <UiTooltip :text="item.products" :vw="15" />
    </template>

    <template #item.observation="{ item }">
      <UiTooltip :text="item.observation" :vw="10" />
    </template>

    <template #item.validated="{ item }">
      <UiCheckIcon
        :id="item.id"
        attr="validated"
        :readonly="false"
        :enable-alert="true"
        :value="item.validated!"
        url="service-order/internal-observation"
        @update-value="item.validated = $event"
      />
    </template>
  </v-data-table>
</template>
