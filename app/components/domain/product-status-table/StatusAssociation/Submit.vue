<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus";

import { transformProductStatusAfterUpdate } from "~/composables/product_status_table/productStatusAfterUpdate";
import { addBlockedStatus, updateProduct } from "~/services/product.service";

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
  if (!props.items) return;

  loading.start();

  const activeProblemStatus = useArrayFindIndex(
    props.items,
    (f) => f.active == true && f.name == "Problema"
  );

  if (activeProblemStatus.value > -1 && product.value.availability !== 6) {
    await addBlockedStatus(product.value);
  }

  const activeStatus = getActiveProductStatusIds(props.items);

  const res = await updateProduct(product.value, activeStatus.value);

  if (res) {
    productPstatuses.value = transformProductStatusAfterUpdate(
      product.value.id,
      props.items
    );

    if (activeProblemStatus.value > -1 && product.value.availability !== 6) {
      product.value.availability = 6;

      $toast().warning(
        "Sucesso ao salvar, Produto alterado para o status bloqueado."
      );
    }
  }

  loading.finish();
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
