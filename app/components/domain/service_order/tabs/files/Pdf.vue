<script setup lang="ts">
const props = defineProps<{
  file: string;
  name: string;
}>();

const { params } = useRoute();
const theme = useTheme();

const loading = ref(false);
const blobUrl = ref<string | null>(null);

onMounted(() => {
  if (!props.file) return;

  loading.value = true;

  // Decodifica a string Base64
  const binaryString = atob(props.file);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Cria um Blob com o conteúdo do PDF
  const blob = new Blob([bytes], { type: "application/pdf" });

  // Cria uma URL para o Blob
  blobUrl.value = URL.createObjectURL(blob);

  loading.value = false;
});

onBeforeUnmount(() => {
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value);
  }
});
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="90vw" height="90vh">
    <template #activator="{ props: dialog }">
      <div
        class="d-flex flex-column align-center"
        style="cursor: pointer"
        v-bind="dialog"
      >
        <v-img
          width="80%"
          rounded="xl"
          aspect-ratio="1"
          src="/img/pdf.png"
          class="my-3 align-end"
          :style="theme.current.value.dark ? 'filter: invert(1)' : ''"
        />

        <v-sheet width="100%" color="transparent" class="pa-1 text-center">
          <span class="body-1 white--text">
            {{
              name.replace(`${params.id}`, "").replace("_", "").toUpperCase()
            }}
          </span>
        </v-sheet>
      </div>
    </template>

    <template #default>
      <iframe
        v-if="!loading && blobUrl"
        :src="blobUrl"
        frameborder="0"
        class="my-iframe"
      />
    </template>
  </v-dialog>
</template>

<style scoped>
.my-iframe {
  height: 85vh;
  width: 90vw;
  border-radius: 20px;
}
</style>
