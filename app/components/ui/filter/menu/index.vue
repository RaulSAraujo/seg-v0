<script setup lang="ts">
import BtnGrid from "./BtnGrid.vue";
import BtnExcel from "./BtnExcel.vue";
import BtnFilter from "./BtnFilter.vue";

defineProps<{
  hideMenu?: boolean;
  hideExcel?: boolean;
  hideGrid?: boolean;
  hideFilter?: boolean;
}>();
</script>

<template>
  <v-menu location="top" offset="3px 0px">
    <template #activator="{ props }">
      <v-btn
        v-if="!hideMenu"
        v-bind="props"
        icon="mdi-dots-vertical"
        variant="plain"
        color="primary"
        density="comfortable"
      />
    </template>

    <v-btn-toggle divided rounded="lg">
      <slot name="menu" />

      <BtnExcel v-if="!hideExcel" hydrate-on-visible />

      <BtnFilter v-if="!hideFilter" hydrate-on-visible />

      <BtnGrid v-if="!hideGrid" hydrate-on-visible />
    </v-btn-toggle>
  </v-menu>
</template>
