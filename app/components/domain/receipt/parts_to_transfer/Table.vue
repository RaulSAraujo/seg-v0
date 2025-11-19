<script lang="ts" setup>
const props = defineProps<{
  items: { name: string; id_tag: number }[];
}>();

const items = computed(() => props.items);

const headers = [
  { title: "Ações", key: "action" },
  { title: "Id tag", key: "id_tag" },
  { title: "Código fabricante", key: "name" },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    density="compact"
    items-per-page="-1"
    disable-sort
    fixed-header
    height="250"
    hide-default-footer
    class="elevation-0 border-thin"
  >
    <template #item.action="{ index }">
      <v-btn
        icon="mdi-delete"
        variant="plain"
        size="small"
        color="pink"
        density="comfortable"
        @click="items.splice(index, 1)"
      />
    </template>
  </v-data-table>

  <span class="d-flex justify-end">Items: {{ items.length }}</span>
</template>
