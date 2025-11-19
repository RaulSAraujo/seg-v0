<script setup lang="ts">
import { useClassificationApparatus } from "~/composables/apparatus/useClassification";

useHead({
  titleTemplate: `Aparelhos - %s`,
});

definePageMeta({
  path: "/aparelhos",
});

const { data } = useClassificationApparatus({ lazy: true });

const dialog = ref(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">APARELHOS</span>

    <ApparatusFilter @active="dialog = true" />

    <ApparatusTable :classification="data ?? []" />

    <ApparatusCreation
      v-model="dialog"
      :classification-items="data ?? []"
      @close="dialog = false"
    />
  </div>
</template>
