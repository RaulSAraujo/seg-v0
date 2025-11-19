<script lang="ts" setup>
defineProps<{
  link: string | null;
}>();
</script>

<template>
  <v-btn
    icon="mdi-open-in-app"
    variant="plain"
    size="small"
    color="blue"
    density="comfortable"
    :disabled="link == null"
    target="_blank"
    :href="link!"
  />
</template>
