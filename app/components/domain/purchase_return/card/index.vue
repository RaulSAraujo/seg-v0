<script lang="ts" setup>
import Files from "./Files.vue";
import Form from "./form/index.vue";
import NewImage from "./NewImage.vue";
import FormProduct from "./form/product/index.vue";
import FormCollection from "./form/Collection.vue";
import FormReturnRefund from "./form/return-refund/index.vue";

import type { FileManagerReadDir } from "~/interfaces/FileManager";
import type { Row } from "~/interfaces/PurchaseReturn";

const props = defineProps<{
  idPurchaseReturn?: string;
  rows?: Row;
}>();

const purchaseReturnStore = usePurchaseReturnStore();
const { form } = storeToRefs(purchaseReturnStore);

if (props.rows) {
  purchaseReturnStore.loadProps(props.rows);
}

const { data, status } = useFetch<FileManagerReadDir>("/api/file-manager", {
  key: `purchase-return-${props.idPurchaseReturn}-files`,
  query: {
    isReadDir: true,
    dirPath: props.idPurchaseReturn,
    route: "purchase-return",
  },
});

onBeforeUnmount(() => {
  purchaseReturnStore.clear();
});
</script>

<template>
  <div class="pa-5">
    <Form />

    <FormProduct />

    <v-row dense>
      <v-col cols="12">
        <UiTextArea v-model="form.reason" label="Motivo" auto-grow />
      </v-col>
    </v-row>

    <FormReturnRefund />

    <FormCollection />

    <NewImage :id-purchase-return="idPurchaseReturn" />
  </div>

  <div class="mx-5">
    <Files
      v-if="!props.idPurchaseReturn || status === 'success'"
      :id-purchase-return="idPurchaseReturn"
      :files-data="data?.elements ?? []"
    />
  </div>
</template>
