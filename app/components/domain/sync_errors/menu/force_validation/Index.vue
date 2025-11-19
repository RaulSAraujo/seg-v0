<script setup lang="ts">
defineEmits(["openDialog"]);
</script>

<template>
  <v-tooltip location="top" text="FORÇAR SINCRONIZAÇÃO" content-class="bg-purple">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-reload"
        style="color: purple"
        class="text-purple"
        @click="$emit('openDialog')"
      />
    </template>
  </v-tooltip>
</template>
