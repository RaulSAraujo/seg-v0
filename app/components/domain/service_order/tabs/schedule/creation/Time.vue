<script lang="ts" setup>
import { useOSScheduleApi } from "~/services/service_order.service/useServiceOrderScheduleApi";

defineOptions({
  name: "ScheduleCreationTime",
});

const props = defineProps<{
  technicalId: number | null;
  date: string | null;
}>();

const times = ref<string[]>([]);

const { isDate } = useDateConversion();

const { availableTimes } = useOSScheduleApi();

watch(
  () => [props.technicalId, props.date],
  async () => {
    const availables = await availableTimes(props.technicalId, props.date);

    times.value = availables || [];
  }
);
</script>

<template>
  <UiAutoComplete
    id="ScheduleCreationTime"
    label="Hora"
    :items="times || []"
    :disabled="props.technicalId == null || !isDate(`${props.date}`)"
  />
</template>
