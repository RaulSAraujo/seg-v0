<script lang="ts" setup>
import { useCounterOrderLogs } from "~/composables/counter_order/useCounterOrderLogs";

import type { Row } from "~/interfaces/CounterOrderLog";

defineOptions({
  name: "CounterOrderLogs",
});

const { params } = useRoute();

if (params.id) {
  useHead({
    titleTemplate: `PED.${params.id} - Logs - %s`,
  });
}

const logs = ref<Row[]>([]);

const { brDateWithTime } = useDateConversion();

const { data, status } = useCounterOrderLogs({ lazy: true });

watch(
  () => status.value,
  () => {
    if (status.value == "success" && data.value) {
      logs.value = data.value;
    }
  }
);

onMounted(() => {
  if (status.value == "success" && data.value) {
    logs.value = data.value;
  }
});
</script>

<template>
  <v-timeline
    density="comfortable"
    align="center"
    side="end"
    truncate-line="both"
    class="my-5"
  >
    <template v-if="status === 'success'">
      <v-timeline-item v-for="log in logs" :key="log.id" dot-color="primary">
        <v-card
          flat
          width="90vw"
          rounded="xl"
          border="primary md"
          color="transparent"
        >
          <template #title>
            <span class="text-h6 font-weight-bold text-primary">
              {{ log.message }}
            </span>
          </template>

          <template #subtitle>
            <span class="text-subtitle-2">
              {{ brDateWithTime(`${log.created_at}`) }}
            </span>
          </template>
        </v-card>
      </v-timeline-item>
    </template>

    <v-timeline-item v-else dot-color="primary">
      <v-skeleton-loader type="image" width="89vw" color="transparent" />
    </v-timeline-item>
  </v-timeline>
</template>
