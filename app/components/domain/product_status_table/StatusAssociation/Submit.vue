<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus";

import { transformProductStatusAfterUpdate } from "~/composables/product_status_table/productStatusAfterUpdate";
import { addBlockedStatus, updatePstatus } from "~/services/product-status-table.service";

defineOptions({
  name: "ProductStatusTableStatusAssociationSubmit",
});

const props = defineProps<{
  items: Row[];
}>();

defineEmits(["isActive"]);

const loading = useLoadingIndicator();

const productStore = useProductStore();
const { product, productPstatuses } = storeToRefs(productStore);

const update = async () => {
  try {
    if (!props.items) return;

    loading.start();

    const activeProblemStatus = useArrayFindIndex(
      props.items,
      (f) => f.active == true && f.name == "Problema"
    );

    if (activeProblemStatus.value > -1 && product.value.availability !== 6) {
      await addBlockedStatus(product.value);
    }

    await updatePstatus(product.value.id, props.items);

    productPstatuses.value = transformProductStatusAfterUpdate(product.value.id, props.items);

    if (activeProblemStatus.value > -1 && product.value.availability !== 6) {
      product.value.availability = 6;

      $toast().success(
        "Sucesso ao salvar, Produto alterado para o status bloqueado."
      );
    }
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="primary"
    width="8vw"
    variant="flat"
    @click="
      update();

      $emit('isActive');
    "
  />
</template>
