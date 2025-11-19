<script setup lang="ts">
defineEmits(["openDialog"]);
</script>

<template>
  <v-tooltip location="top" text="FORÇAR SINCRONIZAÇÃO" content-class="bg-purple">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-reload"
        variant="plain"
        size="small"
        color="purple"
        density="comfortable"
        @click="$emit('openDialog')"
      />
    </template>
  </v-tooltip>
</template>
