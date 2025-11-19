<script setup lang="ts">
defineProps<{
  label?: string;
  alt?: string;
  loading?: boolean;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  persistentPlaceholder?: boolean | undefined;
}>();

defineEmits(["enter"]);
</script>

<template>
  <v-text-field
    :id="alt || label"
    v-maska="'X'"
    rounded="lg"
    :label="label"
    color="primary"
    density="compact"
    variant="outlined"
    :loading="loading"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :hide-details="hideDetails || true"
    :persistent-placeholder="persistentPlaceholder"
    @keypress.enter="$emit('enter')"
  >
    <template #append-inner>
      <slot name="append-inner" />
    </template>
  </v-text-field>
</template>
