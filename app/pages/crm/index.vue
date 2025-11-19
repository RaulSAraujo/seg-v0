<script setup lang="ts">
useHead({
  titleTemplate: `Crm - %s`,
});
</script>

<template>
  <div>
    <div class="mt-5">
      <span class="ml-5 text-h6 text-primary">CRM</span>
    </div>

    <CrmFilter />

    <CrmTable />
  </div>
</template>
