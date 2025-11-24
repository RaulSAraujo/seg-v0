<script lang="ts" setup>
import One from "./One/index.vue";
import Two from "./Two/index.vue";
import Three from "./Three/index.vue";

defineProps<{
  step: number;
  validateOne: boolean;
  validateTwo: boolean;
  validateThree: boolean;
}>();
</script>

<template>
  <v-stepper-header>
    <One :step="step" :validate="validateOne" />

    <v-divider />

    <Two :step="step" :validate="validateTwo" />

    <v-divider />

    <Three :step="step" :validate="validateThree" />
  </v-stepper-header>
</template>
