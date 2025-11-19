<script setup lang="ts">
import type { QuotationItem } from "~/interfaces/Quotation";

defineProps<{
  items: QuotationItem[];
}>();

interface Headers {
  title: string;
  key: string;
  width?: number | string;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Id", key: "id" },
  { title: "Cod. fabricante", key: "name" },
  { title: "Aplicado", key: "applied", align: "center" },
  { title: "Aplicado parcial", key: "parcial_quotation", align: "center" },
  { title: "Cancelado", key: "canceled", align: "center" },
  { title: "Não encontrado", key: "not_found", align: "center" },
  { title: "Disponibilidade", key: "availability", align: "center" },
  { title: "Lead time", key: "lead_time", align: "center" },
  { title: "Estoque virtual", key: "virtual_quantity", align: "center" },
  { title: "Custo", key: "cost", align: "center" },
  { title: "Iniciado em", key: "start_at" },
  { title: "terminado em", key: "finish_at" },
]);
</script>

<template>
  <v-data-table
    :items="items"
    :headers="headers"
    density="compact"
    items-per-page="-1"
    disable-sort
    disable-filtering
    disable-pagination
    hide-default-footer
  >
    <template #item.cost="{ item }">
      <div class="d-flex align-center justify-center">
        <UiToLocaleString :value="item.cost_before" class="text-red" />
        <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
        <UiToLocaleString :value="item.cost_after" class="text-green" />
      </div>
    </template>

    <template #item.availability="{ item }">
      <div class="d-flex align-center justify-center">
        <TemplatesAvailability :availability="item.availability_before" />
        <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
        <TemplatesAvailability :availability="item.availability_after" />
      </div>
    </template>

    <template #item.lead_time="{ item }">
      <span class="text-red">{{ item.lead_time_before ?? 0 }}</span>
      <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
      <span class="text-green">{{ item.lead_time_after ?? 0 }}</span>
    </template>

    <template #item.virtual_quantity="{ item }">
      <span class="text-red">{{ item.virtual_quantity_before ?? 0 }}</span>
      <v-icon size="x-small" class="mx-1">mdi-arrow-right</v-icon>
      <span class="text-green">{{ item.virtual_quantity_after ?? 0 }}</span>
    </template>

    <template #item.applied="{ item }">
      <UiCheckIcon :value="item.applied" :readonly="true" />
    </template>

    <template #item.parcial_quotation="{ item }">
      <UiCheckIcon :value="item.parcial_quotation" :readonly="true" />
    </template>

    <template #item.canceled="{ item }">
      <UiCheckIcon :value="item.canceled" :readonly="true" />
    </template>

    <template #item.not_found="{ item }">
      <UiCheckIcon :value="item.not_found" :readonly="true" />
    </template>

    <template #item.start_at="{ item }">
      <UiDateString
        :date="item.start_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>

    <template #item.finish_at="{ item }">
      <UiDateString
        :date="item.finish_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </v-data-table>
</template>
