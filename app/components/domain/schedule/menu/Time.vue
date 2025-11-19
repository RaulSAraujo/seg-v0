<script lang="ts" setup>
defineOptions({
  name: "ScheduleMenuTime",
});

defineProps<{
  start: string;
  end: string;
}>();

const { $dayjs } = useNuxtApp();
</script>

<template>
  <v-list-item
    :title="$dayjs(start).format('dddd, D [de] MMMM [de] YYYY')"
    :subtitle="`${$dayjs(start).format('HH:mm')} - ${$dayjs(end).format(
      'HH:mm'
    )}`"
    prepend-icon="mdi-clock-outline"
  />
</template>
