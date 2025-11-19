<script lang="ts" setup>
import { useOSScheduleApi } from "~/services/service_order.service/useServiceOrderScheduleApi";

defineOptions({
  name: "ServiceOrderTabsScheduleTable",
});

const headers = [
  { title: "Ações", key: "actions" },
  { title: "Data", key: "date" },
  { title: "Inicio", key: "start_time" },
  { title: "Final", key: "end_time" },
  { title: "Dia da semana", key: "weekday" },
  { title: "Técnico", key: "technical_id" },
  { title: "Motivo", key: "motive" },
  { title: "Observação", key: "observation" },
  { title: "Criado em", key: "created_at" },
];

const { remove } = useOSScheduleApi();

const scheduleStore = useServiceOrderScheduleStore();
const { serviceOrderSchedules } = storeToRefs(scheduleStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="serviceOrderSchedules"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
  >
    <template #item.actions="{ item }">
      <UiDelete function-external @remove="remove(item.id)" />
    </template>

    <template #item.technical_id="{ item }">
      <span>{{ item.User?.name || item.technical_id }}</span>
    </template>

    <template #item.date="{ item }">
      <UiDateString :date="item.date" />
    </template>

    <template #item.observation="{ item }">
      <UiTooltip :text="item.observation" :vw="10" />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString :date="item.created_at" />
    </template>
  </v-data-table>
</template>
