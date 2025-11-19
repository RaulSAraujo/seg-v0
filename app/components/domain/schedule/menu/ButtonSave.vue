<script lang="ts" setup>
import type {
  ServiceOrderSchedule,
  Event,
} from "~/interfaces/ServiceOrderSchedule";

const props = defineProps<{
  event: Event;
}>();

const emit = defineEmits(["save"]);

const loading = ref(false);

const { $customFetch } = useNuxtApp();

const dayjs = useDayjs();

const save = async () => {
  try {
    if (!props.event.title) return $toast().info("Insira o titulo do evento.");

    loading.value = true;

    await $customFetch<ServiceOrderSchedule>("service-order-schedule", {
      method: "POST",
      body: {
        title: props.event.title,
        service_order_id: null,
        start_time: dayjs(props.event.start).format("HH:mm:ss"),
        end_time: dayjs(props.event.end).format("HH:mm:ss"),
        technical_id: props.event.technical,
        date: props.event.start,
        motive: props.event.motive,
        observation: props.event.observation,
      },
    });

    emit("save");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    color="primary"
    text="SALVAR"
    variant="flat"
    width="8vw"
    :loading="loading"
    @click="save"
  />
</template>
