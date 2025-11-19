<script lang="ts" setup>
import type { ServiceOrderProduct } from "~/interfaces/ServiceOrder";
const emit = defineEmits(["select"]);

const headers = [
  { title: "Cód fabricante", key: "name" },
  { title: "Descrição", key: "description" },
];

const productStore = useServiceOrderProductsStore();
const { serviceOrderProducts } = storeToRefs(productStore);

const selected = ref<ServiceOrderProduct[]>([]);

watch(
  () => selected.value,
  (value) => {
    emit("select", value.map((e) => e.name).join(", "));
  }
);
</script>

<template>
  <v-data-table
    v-model="selected"
    show-select
    select-strategy="page"
    :headers="headers"
    :items="serviceOrderProducts"
    disable-sort
    hide-default-footer
    density="compact"
    class="mt-2"
    items-per-page="-1"
    return-object
  >
    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="4" />
    </template>
  </v-data-table>
</template>
