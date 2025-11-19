<script lang="ts" setup>
import type { FileWithBase64 } from "~~/shared/interfaces/current/FileWithBase64";

const props = defineProps<{
  idPurchaseReturn?: string;
}>();

const purchaseReturnStore = usePurchaseReturnStore();
const { files } = storeToRefs(purchaseReturnStore);

const addImage = async (event: FileWithBase64) => {
  try {
    if (props.idPurchaseReturn) {
      const res = await $api<{ pathNewFile: string }>("/api/file-manager", {
        method: "POST",
        body: {
          id: props.idPurchaseReturn,
          route: "purchase-return",
          base64: event.base64,
        },
      });

      event.name =
        res.pathNewFile.replace(`/${props.idPurchaseReturn}/`, "") ??
        event.name;
    }

    files.value.push(event);

    $toast().info("Arquivo adicionado!");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <UiButtonFileToBase64 @new-base64="addImage" />
</template>
