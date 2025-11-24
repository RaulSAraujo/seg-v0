<script lang="ts" setup>
import TableProducts from "./TableProducts.vue";
import { useEventSourcePurchaseControl } from "~/composables/purchase_order/useEventSource";

const purchaseOrderStore = usePurchaseOrderStore();
const { activeEventSourceXml } = storeToRefs(purchaseOrderStore);

const { products, setupEventSource } = useEventSourcePurchaseControl();

const filePath = useState<string>("file-path-purchase-control", () => "");

const clearProps = () => {
  products.value = [];
  filePath.value = "";
  activeEventSourceXml.value = false;
};

watch(
  () => activeEventSourceXml.value,
  (value) => {
    if (value == true) {
      setupEventSource(filePath.value);
    }
  }
);
</script>

<template>
  <v-dialog
    v-model="activeEventSourceXml"
    transition="dialog-top-transition"
    width="350px"
    @after-leave="clearProps"
  >
    <v-card rounded="xl" title="PRODUTOS XML" class="card-products-xml">
      <TableProducts :items="products" />
    </v-card>
  </v-dialog>
</template>

<style>
.card-products-xml {
  overflow-x: hidden;
  overflow-y: scroll;
  --width-scrollbar: 5px;
  --track-color: rgba(0, 0, 0, 0);
  --thumb-color: #8080804d;
  --border-color: rgba(0, 0, 0, 0);
  --track-color-hover: #808080a3;
}
</style>
