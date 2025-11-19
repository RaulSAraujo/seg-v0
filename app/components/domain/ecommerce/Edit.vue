<script setup lang="ts">
import type { Row } from "~/interfaces/Ecommerce";

const props = defineProps<{
  item: Row;
}>();

defineEmits(["update"]);

const el = ref();

watch(
  () => el.value,
  () => {
    if (el.value) {
      Object.entries(props.item).forEach(([key, value]) => {
        if (key in el.value.form) {
          (el.value.form as unknown as Record<string, unknown>)[key] = value;
        }
      });
    }
  }
);
</script>

<template>
  <v-dialog width="300px">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        icon="mdi-pencil"
        variant="plain"
        size="small"
        density="comfortable"
        color="blue"
      />
    </template>

    <template #default="{ isActive }">
      <EcommerceForm
        ref="el"
        :title="item.name"
        method-rest="PUT"
        @update="$emit('update', $event)"
        @close="isActive.value = false"
      />
    </template>
  </v-dialog>
</template>
