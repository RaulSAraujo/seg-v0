<script lang="ts" setup>
defineProps<{
  type: string;
}>();

const color = (type: string) => {
  if (type == "SANGRIA") return "blue";
  if (type == "ENTRADA") return "green";
  if (type == "DEBITO") return "red";

  return "pink";
};
</script>

<template>
  <v-avatar size="x-small" :color="color(type)" class="font-weight-bold white--text">
    {{ type.substring(0, 1) }}
  </v-avatar>
</template>
