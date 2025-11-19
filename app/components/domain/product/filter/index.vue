<script lang="ts" setup>
import BtnLogs from "./menu/BtnLogs.vue";

defineOptions({
  name: "ProductFilter",
});
</script>

<template>
  <UiFilter>
    <template #menu>
      <BtnLogs />
    </template>
  </UiFilter>
</template>
