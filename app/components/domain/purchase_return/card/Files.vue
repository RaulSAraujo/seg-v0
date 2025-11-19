<script lang="ts" setup>
import type { Element } from "~/interfaces/FileManager";

const props = defineProps<{
  filesData: Element[];
  idPurchaseReturn?: string;
}>();

const { files } = useFileManager({
  resourceId: props.idPurchaseReturn,
  apiRoute: "purchase-return",
  filenames: props.filesData.map((file) => file.name),
});

const purchaseReturnStore = usePurchaseReturnStore();
const { files: filesStore } = storeToRefs(purchaseReturnStore);

const images = computed(() => {
  const images = filesStore.value.filter((file) => file.type.includes("image"));

  return images.map((file) => ({
    filename: file.name,
    data: file.base64,
  }));
});

const pdfs = computed(() => {
  const pdfs = filesStore.value.filter((file) => file.type.includes("pdf"));

  return pdfs.map((file) => ({
    filename: file.name,
    data: file.base64,
  }));
});

const remove = async (data: { index: number; filename: string }) => {
  try {
    if (props.idPurchaseReturn) {
      const filename = images.value[data.index]?.filename.replace(
        `${props.idPurchaseReturn}/`,
        ""
      );

      await $api<{ success: boolean }>("/api/file-manager", {
        method: "DELETE",
        query: {
          route: "purchase-return",
          id: props.idPurchaseReturn,
          filename,
        },
      });
    }

    filesStore.value = filesStore.value.filter(
      (file) => file.name !== data.filename
    );

    $toast().info("Arquivo removido!");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

watch(
  () => files.value,
  (value) => {
    filesStore.value = value;
  }
);
</script>

<template>
  <UiGallery
    :pdfs="pdfs"
    :images="images"
    :active-remove="true"
    @remove="remove"
  />
</template>
