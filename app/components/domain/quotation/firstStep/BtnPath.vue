<script lang="ts" setup>
defineProps<{
  filePath: string;
}>();

const { $config } = useNuxtApp();
</script>

<template>
  <v-btn
    text="CÓDIGOS.XLSX"
    :color="filePath.length === 0 ? 'grey' : 'primary'"
    :disabled="filePath.length === 0"
    target="_blank"
    :href="`${$config.public.base_url_local}${filePath}`"
  />
</template>
