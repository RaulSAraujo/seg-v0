<script setup lang="ts">
useHead({
  titleTemplate: `Data limite - %s`,
});

definePageMeta({
  path: "/data-limite",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">DATA LIMITE</span>

    <LimitDateFilter @active="dialog = true" />

    <LimitDateTable />

    <LimitDateCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
