<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const purchaseOrderStore = usePurchaseOrderStore();
const { edit } = storeToRefs(purchaseOrderStore);

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    mouseEvent: event,
    attr: "equivalent_name",
    type: "string",
    item: props.item,
    externalUpdateText: true,
    updateText: (value) => {
      if (edit.value.item) {
        if (!value) {
          edit.value.item.equivalent_name = value;

          return;
        }

        edit.value.item.equivalent_name = edit.value.item?.name;
        edit.value.item.name = value;
      }
    },
  });
};
</script>

<template>
  <div class="container-global-edit" @click="activeEdit">
    <span v-if="item.equivalent_name" class="text-truncate">
      {{ item.equivalent_name }}
    </span>
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
