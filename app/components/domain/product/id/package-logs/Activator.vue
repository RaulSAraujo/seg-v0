<script lang="ts" setup>
defineProps<{
  length: number;
}>();
</script>

<template>
  <v-badge
    color="blue"
    bordered
    :content="length"
    offset-y="10"
    offset-x="12"
    floating
  >
    <v-btn
      icon="mdi-history"
      variant="plain"
      color="primary"
      density="comfortable"
    />
  </v-badge>
</template>
