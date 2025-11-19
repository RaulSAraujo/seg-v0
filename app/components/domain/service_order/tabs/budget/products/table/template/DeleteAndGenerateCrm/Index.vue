<script lang="ts" setup>
import Dialog from "./Dialog.vue";

defineProps<{
  id: number;
  nameProduct: string;
}>();

defineEmits(["remove"]);

const dialog = ref<boolean>(false);
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    size="small"
    color="pink"
    density="comfortable"
    @click="dialog = true"
  />

  <Dialog
    :id="id"
    v-model="dialog"
    :name-product="nameProduct"
    @remove="$emit('remove')"
  />
</template>
