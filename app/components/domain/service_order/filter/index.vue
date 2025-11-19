<script lang="ts" setup>
import BilledReport from "./menu/BilledReport.vue";
</script>

<template>
  <UiFilter>
    <template #menu>
      <BilledReport />
    </template>

    <template #button-create>
      <v-btn
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
        :to="{
          name: 'service-order-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
