<script lang="ts" setup>
defineProps<{
  divergence: string;
}>();

const textDivergence = (text: string) => {
  const parts = text.split("-->");

  return parts;
};
</script>

<template>
  <span class="green--text">
    {{ textDivergence(divergence)[0] }}
  </span>

  <v-icon x-small>mdi-arrow-right-thin</v-icon>

  <span class="red--text">
    {{ textDivergence(divergence)[1] }}
  </span>
</template>
