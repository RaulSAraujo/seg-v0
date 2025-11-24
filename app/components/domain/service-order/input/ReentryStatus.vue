<script lang="ts" setup>
const props = defineProps<{
  reentryStatus: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
}>();

const emit = defineEmits(["update"]);

const reentryComputed = computed({
  get: () => props.reentryStatus,
  set: (newValue) => {
    if (props.reentryStatus == "NONE") {
      emit("update", "GREATER_THAN_90_DAYS");

      return;
    }

    if (props.reentryStatus == "LESS_THAN_90_DAYS") {
      emit("update", "NONE");

      return;
    }

    emit("update", newValue);
  },
});
</script>

<template>
  <v-switch
    v-model="reentryComputed"
    inset
    :indeterminate="reentryComputed == 'NONE' || reentryComputed == null"
    density="compact"
    label="Reingresso"
    false-value="LESS_THAN_90_DAYS"
    true-value="GREATER_THAN_90_DAYS"
    :color="reentryComputed == 'GREATER_THAN_90_DAYS' ? 'yellow' : ''"
    :base-color="reentryComputed == 'LESS_THAN_90_DAYS' ? 'red' : ''"
    hide-details
  />
</template>
