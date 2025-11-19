<script lang="ts" setup>
defineProps<{
  date: string;
}>();

const { $dayjs } = useNuxtApp();

const now = useNow({ interval: 1000 });
</script>

<template>
  <span class="text-grey text-caption font-italic">
    {{
      $dayjs(now).diff(date, "minutes") > 60
        ? `${$dayjs(now).diff(date, "hours")}h`
        : `${$dayjs(now).diff(date, "minutes")}min`
    }}
  </span>
</template>
