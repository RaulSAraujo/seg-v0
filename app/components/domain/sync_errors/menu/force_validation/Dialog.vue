<script lang="ts" setup>
const props = defineProps<{
  specificRef?: number | null;
}>();

onBeforeUnmount(() => {
  eventSource.close();

  emit("close", false);
});

const emit = defineEmits(["close"]);

interface Process {
  stage: string;
  percentage: number;
}

const process = ref<Process[]>([]);

const baseURL = useNuxtApp().$config.public.automation_base_url as string;

let url = `${baseURL}/sync-erp-seg-tray`;

if (props.specificRef) {
  url = `${url}?specific_ref=${props.specificRef}`;
}

const eventSource = new EventSource(url);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data) as Process;

  if (data.stage === "Finished") emit("close", false);

  const newProcess = process.value.find((item) => item.stage === data.stage);

  if (newProcess) {
    newProcess.percentage = data.percentage;
  } else {
    process.value.push({ stage: data.stage, percentage: data.percentage });
  }
};

eventSource.onerror = () => {
  eventSource.close();
};
</script>

<template>
  <v-dialog persistent width="300">
    <v-card color="black" dark rounded="xl">
      <template #text>
        <div class="text-center">
          <p v-if="process.length === 0">Por favor espere...</p>
        </div>

        <div
          v-for="(p, index) in process"
          :key="index"
          class="my-1 text-center"
          style="width: 100%"
        >
          <span class="text-caption">{{ p.stage }}</span>
          <v-progress-linear
            v-model="p.percentage"
            rounded
            height="20"
            color="white"
            background-opacity="0.7"
          >
            <template #default="{ value }">
              <strong class="text-blue text-caption">{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>
