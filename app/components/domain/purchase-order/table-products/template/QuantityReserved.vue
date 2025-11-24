<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const purchaseOrderStore = usePurchaseOrderStore();

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    mouseEvent: event,
    attr: "quantity_reserved",
    type: "number",
    item: props.item,
  });
};
</script>

<template>
  <div class="container-global-edit" @click="activeEdit">
    <span>{{ item.quantity_reserved }}</span>
  </div>
</template>

<style scoped>
.container-global-edit {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
