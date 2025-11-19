<script lang="ts" setup>
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

const props = defineProps<{
  files: FileWithBase64[];
  activeRemove: boolean;
}>();

const emit = defineEmits(["remove"]);

const { params } = useRoute();

const images = computed(() => {
  const images = props.files.filter((file) => file.type.includes("image"));

  return (
    images.map((file) => ({
      filename: file.name,
      data: file.base64,
    })) ?? []
  );
});

const pdfs = computed(() => {
  const pdfs = props.files.filter((file) => file.type.includes("pdf"));

  return (
    pdfs.map((file) => ({
      filename: file.name,
      data: file.base64,
    })) ?? []
  );
});

const remove = async (data: { index: number; filename: string }) => {
  try {
    if (params.id) {
      await useFetch<{ success: boolean }>("/api/file-manager", {
        method: "DELETE",
        query: {
          route: "purchase-return",
          id: params.id,
          filename: images.value[data.index]?.filename.replace(
            `${params.id}/`,
            ""
          ),
        },
      });
    }

    $toast().info("Arquivo removido!");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };
    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    emit("remove", data.filename);
  }
};
</script>

<template>
  <UiGallery
    :pdfs="pdfs"
    :images="images"
    :active-remove="activeRemove"
    @remove="remove"
  />
</template>
