<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControl";

const tableStore = useTableStore();
const { selected, items } = storeToRefs(tableStore);

const selectAll = () => {
  (items.value as Row[]).forEach((i) => {
    i.PurchaseControlProducts.forEach((e) => {
      if (!selected.value.includes(e as never)) {
        selected.value.push(e as never);
      }
    });
  });
};
</script>

<template>
  <v-btn
    text="Selecionar pagina"
    variant="text"
    color="primary"
    density="compact"
    :ripple="false"
    class="pa-0 mx-1"
    @click="selectAll"
  />
</template>
