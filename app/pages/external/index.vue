<script setup lang="ts">
import type { Row } from "~/interfaces/GeneralReport";

useHead({
  titleTemplate: `Atendimento externo - %s`,
});

definePageMeta({
  path: "/atendimento-externo",
});

const loading = ref(false);
const items = ref<Row[]>([]);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ATENDIMENTO EXTERNO</span>

    <ExternalFilter
      :items="items"
      :loading="loading"
      @loading="loading = $event"
      @set-items="items = $event"
    />

    <ExternalTable :items="items" :loading="loading" />
  </div>
</template>
