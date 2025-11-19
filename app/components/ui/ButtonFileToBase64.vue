<script lang="ts" setup>
defineProps<{
  label?: string;
}>();

const emit = defineEmits(["newBase64"]);

const files = ref<File[]>([]);

const { base64, convertToBase64 } = useFileOrBase64();

watch(
  () => files.value,
  () => {
    files.value.forEach(async (e) => await convertToBase64(e));
  }
);

watch(
  () => base64.value,
  () => emit("newBase64", base64.value)
);
</script>

<template>
  <v-btn text="ANEXAR ARQUIVOS" color="primary" variant="outlined">
    <template #default>
      <v-file-input
        id="input-files"
        v-model="files"
        prepend-icon="mdi-close"
        hide-details
        hide-input
        multiple
        class="input-files"
        accept="image/jpeg,image/png,application/pdf"
      />
      {{ label || "ANEXAR ARQUIVOS" }}
    </template>
  </v-btn>
</template>

<style scoped>
:deep(.input-files) {
  display: block;
}

:deep(.input-files .v-icon) {
  width: 100%;
  position: absolute;
  opacity: 0;
}
</style>
