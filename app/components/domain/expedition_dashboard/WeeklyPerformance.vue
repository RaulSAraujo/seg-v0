<script lang="ts" setup>
import type {
  WeeklyPerformance,
  Week,
} from "~/interfaces/ExpeditionDashboard";

defineProps<{
  weeklyPerformance: WeeklyPerformance[];
}>();

// const theme = useTheme();

const { $customFetch } = useNuxtApp();

const newValueComputed = (oldValue: "BAIXO" | "MÉDIO" | "ALTO" | null) => {
  if (oldValue == "BAIXO") return "MÉDIO";
  if (oldValue == "MÉDIO") return "ALTO";
  if (oldValue == "ALTO") return "BAIXO";

  return "BAIXO";
};

const created = async (item: Week) => {
  try {
    item.performance = newValueComputed(item.performance);

    const { id } = await $customFetch<Week>("marketplace-weekly-performance", {
      method: "POST",
      body: item,
    });

    item.id = id;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const update = async (item: Week) => {
  try {
    item.performance = newValueComputed(item.performance);

    await $customFetch("marketplace-weekly-performance", {
      method: "PUT",
      body: {
        id: item.id,
        performance: item.performance,
      },
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const color = (value: "BAIXO" | "MÉDIO" | "ALTO" | null) => {
  if (value == "BAIXO") return "red";
  if (value == "MÉDIO") return "yellow";
  if (value == "ALTO") return "green";

  return "";
};
</script>

<template>
  <div>
    <span class="text-h4 text-primary font-weight-black"
      >DESEMPENHO SEMANAL</span
    >

    <v-row
      v-for="(weeks, index) in weeklyPerformance"
      :key="index"
      justify="space-between"
      class="ml-1 d-flex align-center"
      dense
    >
      <v-col cols="3" class="text-center text-h6">
        <span>{{ weeks.marketplace }}</span>
      </v-col>

      <v-col v-for="(week, i) in weeks.weeks" :key="i" cols="1">
        <div class="d-flex flex-column align-center">
          <v-icon
            v-if="week.id != null"
            icon="mdi-circle"
            size="68px"
            :color="color(week.performance)"
            :disabled="!week.editable"
            @click="update(week)"
          />

          <v-icon
            v-else
            icon="mdi-circle-outline"
            size="68px"
            :disabled="!week.editable"
            @click="created(week)"
          />
        </div>
      </v-col>
    </v-row>

    <v-row justify="space-between" class="ml-1 d-flex align-center">
      <v-col cols="3" />

      <v-col v-for="NumberOfTheWeek in 5" :key="NumberOfTheWeek" cols="1">
        <span class="text-h6"> S{{ NumberOfTheWeek }}</span>
      </v-col>
    </v-row>
  </div>
</template>
