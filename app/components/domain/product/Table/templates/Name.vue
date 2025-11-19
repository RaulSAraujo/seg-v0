<script setup lang="ts">
defineOptions({
  name: "ProductName",
});

defineProps<{ name: string | null; observationCodFab: string | null }>();
</script>

<template>
  <span v-if="!observationCodFab && name" class="text-truncate">
    {{ name.toUpperCase() }}
  </span>

  <v-tooltip v-else location="top" :text="observationCodFab?.toUpperCase()">
    <template #activator="{ props }">
      <span v-bind="props" class="text-red text-truncate">
        {{ name?.toUpperCase() }}
      </span>
    </template>
  </v-tooltip>
</template>
