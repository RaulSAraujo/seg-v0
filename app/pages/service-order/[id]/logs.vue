<script lang="ts" setup>
import { useOSLogsApi } from "~/services/service_order.service/useServiceOrderLogApi";

const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - Logs - %s`,
});

const { brDateWithTime } = useDateConversion();

const { get } = useOSLogsApi();
const { data, status } = get(params.id as string, { lazy: true });

const logStore = useServiceOrderLogStore();
const { logsData } = storeToRefs(logStore);

onMounted(() => {
  if (status.value == "success" && data.value) {
    logStore.set(data.value);
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
    <v-timeline-item v-for="log in logsData" :key="log.id" dot-color="primary">
      <v-card flat width="90vw" rounded="xl" border="primary md">
        <template #title>
          <span class="text-h6 font-weight-bold text-primary">
            {{ log.log_description }}
          </span>
        </template>

        <template #subtitle>
          <span class="text-subtitle-2"
            >{{ brDateWithTime(`${log.created_at}`) }} -
            {{ log.User.name }}</span
          >
        </template>

        <template #text>
          <span class="text-caption">
            {{ log.initial_status }}
            <v-icon v-if="log.initial_status">mdi-arrow-right-thin</v-icon>
            {{ log.final_status }}
          </span>
        </template>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
