<script setup lang="ts">
defineProps<{ value: string | Date | null | undefined }>();

const { $dayjs } = useNuxtApp();
</script>

<template>
  <span>
    {{ $dayjs(value).isValid() ? $dayjs(value).format("DD/MM/YYYY") : "" }}
  </span>
</template>
