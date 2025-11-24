<script lang="ts" setup>
import AnalysisYears from "./template/analysis_years/index.vue";
import AnalysisMonths from "./template/analysis_months/index.vue";

defineOptions({
  name: "StockMovementAnalysisTable",
});
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <div>
        <AnalysisMonths :analysis="item.StockMovementAnalysisMonths" />

        <AnalysisYears :analysis="item.StockMovementAnalysisYears" />
      </div>
    </template>
  </UiTable>
</template>
