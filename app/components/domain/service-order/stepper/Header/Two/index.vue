<script lang="ts" setup>
defineProps<{
  step: number;
  validate: boolean;
}>();
</script>

<template>
  <v-stepper-item
    :value="2"
    :complete="validate"
    title="Dados do cliente e endereço"
    :color="step >= 2 ? 'primary' : ''"
  />
</template>
