<script setup lang="ts">
import type { Row } from "~/interfaces/CounterOrder";

const props = defineProps<{
  idPurchaseReturn?: string;
}>();

const router = useRouter();
const loading = useLoadingIndicator();
const { $customFetch } = useNuxtApp();
const { convertToFile } = useFileOrBase64();
const { isDate, databaseDate } = useDateConversion();

const purchaseReturnStore = usePurchaseReturnStore();
const { form, files } = storeToRefs(purchaseReturnStore);

const save = async () => {
  try {
    loading.start();

    const formData = new FormData();

    if (!props.idPurchaseReturn) {
      for (const img of files.value) {
        formData.append("files", convertToFile(img.base64));
      }
    }

    Object.entries(form.value).forEach(([key, value]) => {
      if (value == undefined && value == null) return;

      if (typeof value == "string" && isDate(value)) {
        return formData.append(key, databaseDate(`${value}`));
      }

      formData.append(key, `${value}`);
    });

    await $customFetch<Row>("purchase-return", {
      method: props.idPurchaseReturn ? "PUT" : "POST",
      body: formData,
    });

    if (!props.idPurchaseReturn) {
      $toast().success("Sucesso em criar a nova devolução de compra");

      router.push({
        name: "purchase-return",
      });
    } else {
      $toast().success("Sucesso ao atualizar.");
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: absolute; bottom: 30px; right: 14px"
    @click="save"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
