<script setup lang="ts">
import type { Row } from "~/interfaces/Product";
import { findProduct } from "~/services/product-kit.service";

defineOptions({
  name: "ProductKitChangeComposition",
});

const search = ref<string | null>(null);
const debounced = refDebounced(search, 200);
const productItems = ref<Row[]>([]);
const productSelected = ref<Row | null>(null);
const quantity = ref<number>(1);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      try {
        productItems.value = await findProduct(debounced.value);
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
      }
    }

    if (typeof debounced.value == "object") {
      productSelected.value = debounced.value;
    }
  }
);

const close = () => {
  quantity.value = 1;
  search.value = null;
  productItems.value = [];
  productSelected.value = null;
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="500" persistent>
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="flat" color="blue" :text="'EDITAR KIT'" />
    </template>

    <template #default="{ isActive }">
      <v-card title="ASSOCIAR UM PRODUTO AO KIT" rounded="xl">
        <v-card-text class="mt-5">
          <v-row dense>
            <v-col cols="7">
              <UiCombobox
                v-model="search"
                label="Digite o codigo de fabricante"
                :items="productItems"
                item-title="name"
                item-value="name"
                :multiple="false"
                :hide-details="true"
                :return-object="true"
                class="mb-2"
              />
            </v-col>
            <v-col cols="5">
              <v-number-input
                v-model="quantity"
                :reverse="false"
                control-variant="split"
                label="Informe a quantidade"
                :hide-input="false"
                :inset="false"
                variant="outlined"
                density="compact"
                :min="0"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="FECHAR"
            color="red"
            @click="
              isActive.value = false;
              close();
            "
          />

          <ProductKitChangeCompositionSave
            :selected="productSelected"
            :quantity="quantity"
            :disabled="typeof search != 'object' || search == null"
            @close="
              isActive.value = false;

              close();
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
