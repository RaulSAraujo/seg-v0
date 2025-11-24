<script setup lang="ts">
const props = defineProps<{
  items: { name: string; icon: string }[];
}>();

const itemsComputed = computed(() => props.items);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Código de fabricante", key: "name" },
  { title: "Aplicado", key: "icon", align: "center" },
]);

const color = (icon: string) => {
  if (icon == "mdi-close-circle") return "red";
  if (icon == "mdi-progress-close") return "blue";
  if (icon == "mdi-check-circle") return "green";

  return "";
};
</script>

<template>
  <v-data-table
    :items="itemsComputed"
    :headers="headers"
    height="60vh"
    items-per-page="-1"
    disable-sort
    hide-default-footer
  >
    <template #item.icon="{ item }">
      <v-icon :icon="item.icon" :color="color(item.icon)" />
    </template>
  </v-data-table>
</template>
