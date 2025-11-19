<script lang="ts" setup>
const props = defineProps<{
  file: string;
}>();

const url = ref("");

const getUrl = async () => {
  try {
    const binStr = atob(props.file.replace("data:application/pdf;base64,", ""));
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    const blob = new Blob([arr], { type: "application/pdf" });

    url.value = URL.createObjectURL(blob);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-dialog
    width="90vw"
    height="90vh"
    transition="dialog-top-transition"
    @after-enter="getUrl()"
  >
    <template #default>
      <iframe class="my-iframe" :src="url" frameborder="0" />
    </template>
  </v-dialog>
</template>

<style scoped>
:deep(.my-iframe) {
  height: 85vh;
  width: 90vw;
  border-radius: 20px;
}
</style>
