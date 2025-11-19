<script lang="ts" setup>
import BtnReport from "./menu/BtnReport.vue";
import BtnCreation from "./BtnCreation.vue";
import BtnCloseCash from "./menu/BtnCloseCash.vue";

defineOptions({
  name: "CashControlFilter",
});
</script>

<template>
  <UiFilter>
    <template #button-create>
      <BtnCreation />
    </template>

    <template #menu>
      <BtnReport />

      <BtnCloseCash />
    </template>
  </UiFilter>
</template>
