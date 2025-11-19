<script setup lang="ts">
import type { Row } from "~/interfaces/PurchaseControlProduct";

interface Form {
  invoice?: string;
  receiving_at?: string;
  status?: boolean;
}

const props = defineProps<{
  items: Row[];
  form: Form;
}>();

const active = computed(() => props.items.length > 0);

const count = computed(() =>
  useArrayReduce(
    props.items,
    (sum, val) =>
      val.receiving_quantity >= val.quantity_purchased ? sum + 1 : sum + 0,
    0
  )
);

watch(active, () => {
  const root = document.documentElement;

  if (!active.value) {
    root.style.setProperty("--padding-bottom", "0px");
  } else {
    root.style.setProperty("--padding-bottom", "74px");
  }
});
</script>

<template>
  <v-bottom-sheet
    v-model="active"
    persistent
    :scrim="false"
    no-click-animation
    :retain-focus="false"
    scroll-strategy="reposition"
  >
    <v-sheet class="d-flex align-center px-5 py-2" height="75px">
      <div class="d-flex align-center text-button-sheet mr-4">
        <span>
          Concluído:

          <strong class="text-green">{{ count }}</strong>
        </span>

        <v-divider vertical class="mx-2" />

        <span>
          Total:

          <strong class="text-teal">{{ items.length }}</strong>
        </span>
      </div>

      <div style="width: 350px">
        <ReceiptTextFieldCount :items="items" />
      </div>

      <v-spacer />

      <ReceiptBottomSheetPrinter :items="items" />

      <ReceiptBottomSheetExcel :form="form" />

      <ReceiptPartsToTransfer />

      <ReceiptBottomSheetConclude :items="items" />
    </v-sheet>
  </v-bottom-sheet>
</template>

<style>
.text-button-sheet {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 2.667;
  letter-spacing: 0.1666666667em;
  text-transform: uppercase;
}
</style>
