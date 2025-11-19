<script setup lang="ts">
defineProps<{
  min?: number;
  max?: number;
  alt?: string;
  step?: number;
  label?: string;
  precision?: number;
  disabled?: boolean | undefined;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  controlVariant?: "stacked" | "split";
  hideDetails?: boolean | "auto" | undefined;
}>();
</script>

<template>
  <v-number-input
    :id="alt ?? label"
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :inset="false"
    :reverse="false"
    density="compact"
    variant="outlined"
    rounded="lg"
    :hide-input="false"
    color="primary"
    :clearable="clearable"
    :placeholder="placeholder"
    :control-variant="controlVariant || 'split'"
    :hide-details="hideDetails || true"
    :precision="precision || 0"
    :disabled="disabled"
  />
</template>
