<script setup lang="ts">
import CostStatus from "./CostStatus.vue";

import type { StockMovementAnalysisMonths } from "~/interfaces/StockMovementAnalysis";

defineOptions({
  name: "StockMovementAnalysisAnalysisMonths",
});

const props = defineProps<{
  analysis: StockMovementAnalysisMonths;
}>();

const itemRowBackground = (index: number) => {
  if (props.analysis.days_without_stock_status[index] == "PARCIAL") {
    return "parcial-row";
  }

  if (props.analysis.days_without_stock_status[index] == "INTEGRAL") {
    return "integral-row";
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="65vw">
    <template #activator="{ props: dialog }">
      <v-tooltip location="top" text="Analise por mes" content-class="bg-blue">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, dialog, tooltip)"
            icon="mdi-chart-box-outline"
            variant="plain"
            size="small"
            density="comfortable"
            color="blue"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl" title="ANÁLISE POR MES">
        <template #text>
          <v-table>
            <thead>
              <tr>
                <th />
                <th
                  v-for="header in analysis.month_period"
                  :key="header"
                  class="text-center"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Status custo</td>
                <td
                  v-for="item in analysis.cost_status"
                  :key="item"
                  class="text-center"
                >
                  <CostStatus :cost-status="item" />
                </td>
              </tr>

              <tr>
                <td>Dias sem estoque</td>
                <td
                  v-for="(item, index) in analysis.days_without_stock"
                  :key="index"
                  class="text-center"
                  :class="itemRowBackground(index)"
                >
                  {{ item }}
                </td>
              </tr>

              <tr>
                <td>vendas perdidas</td>
                <td
                  v-for="(item, index) in analysis.lost_sales"
                  :key="index"
                  class="text-center"
                  :class="itemRowBackground(index)"
                >
                  {{ item }}
                </td>
              </tr>

              <tr>
                <td>vendas faturadas</td>
                <td
                  v-for="(item, index) in analysis.invoiced_sales"
                  :key="index"
                  class="text-center"
                  :class="itemRowBackground(index)"
                >
                  {{ item }}
                </td>
              </tr>

              <tr>
                <td>Previsão de vendas</td>
                <td
                  v-for="(item, index) in analysis.sales_forecast"
                  :key="index"
                  class="text-center"
                  :class="itemRowBackground(index)"
                >
                  {{ item }}
                </td>
              </tr>

              <tr>
                <td>Alteração de custo</td>
                <td
                  v-for="(item, index) in analysis.from_to_cost"
                  :key="index"
                  class="text-center"
                  :class="itemRowBackground(index)"
                >
                  <UiTooltip :text="item" :vw="5" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style>
.parcial-row {
  color: orange;
}

.integral-row {
  color: red;
}
</style>
