<script setup lang="ts">
defineOptions({
  name: "CashControlReport",
});

const dialog = useState<boolean>("active-report-cash-control", () => false);
</script>

<template>
  <v-tooltip
    location="top"
    text="RELATÓRIO"
    content-class="bg-amber text-white"
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-file-chart"
        style="color: darkgoldenrod"
        @click="dialog = true"
      />
    </template>
  </v-tooltip>
</template>
