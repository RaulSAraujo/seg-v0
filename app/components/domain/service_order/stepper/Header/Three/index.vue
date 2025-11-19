<script lang="ts" setup>
defineProps<{
  step: number;
  validate: boolean;
}>();
</script>

<template>
  <v-stepper-item
    :value="3"
    :complete="validate"
    title="Dados do aparelho"
    :color="step >= 3 ? 'primary' : ''"
  />
</template>
