<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const purchaseOrderStore = usePurchaseOrderStore();

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    mouseEvent: event,
    attr: "reservation",
    type: "string",
    item: props.item,
  });
};
</script>

<template>
  <div class="container-global-edit" @click="activeEdit">
    <UiTooltip :text="item.reservation" :vw="5" />
  </div>
</template>

<style scoped>
.container-global-edit {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
