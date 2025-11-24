<script lang="ts" setup>
defineProps<{
  step: number;
  validate: boolean;
}>();
</script>

<template>
  <v-stepper-item
    :value="1"
    :complete="validate"
    title="Informações gerais"
    :color="step >= 1 ? 'primary' : ''"
  />
</template>
