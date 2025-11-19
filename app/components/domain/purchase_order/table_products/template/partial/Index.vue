<script lang="ts" setup>
import ButtonSave from "./ButtonSave.vue";
import { revertPartialProductPurchaseControl } from "~/services/purchase-order.service";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
  products: Row[];
}>();

const emit = defineEmits(["update", "block", "add", "destroy"]);

const dialog = ref(false);
const quantity = ref(1);

const partialComp = computed({
  get() {
    return props.item.partial;
  },
  set(newValue) {
    if (newValue == true) {
      dialog.value = true;
    } else {
      destroyPartial();
    }
  },
});

const destroyPartial = async () => {
  try {
    const res = await revertPartialProductPurchaseControl(props.item.id);

    if (res.fatherItem) {
      const index = props.products.findIndex((e) => e.id == res.fatherItem.id);

      emit("block", { index: index, value: false });
    }

    emit("update", res.itemUpdated);

    if (res.childItem) {
      const index = props.products.findIndex((e) => e.id == res.childItem.id);

      emit("destroy", index);
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const close = () => {
  quantity.value = 1;

  setTimeout(() => {
    dialog.value = false;
  }, 150);
};
</script>

<template>
  <v-switch
    v-model="partialComp"
    inset
    density="compact"
    hide-details
    :disabled="
      (item.quantity_purchased == 1 && item.partial == false) || item.block
    "
    color="primary"
    :base-color="partialComp ? 'primary' : ''"
  />

  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="300"
    @after-leave="close"
  >
    <template #default>
      <v-card title="INFORME A QUANTIDADE" rounded="xl">
        <template #text>
          <UiNumberInput
            v-model="quantity"
            :min="0"
            :max="item.quantity_purchased - 1"
          />
        </template>

        <template #actions>
          <v-spacer />

          <ButtonSave
            :item="item"
            :products="products"
            :quantity="quantity"
            @block="$emit('block', $event)"
            @update="$emit('update', $event)"
            @add="$emit('add', $event)"
            @close="close"
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
