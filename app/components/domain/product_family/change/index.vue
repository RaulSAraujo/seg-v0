<script setup lang="ts">
import type { Row } from "~/interfaces/ProductSell";
import { findFamily } from "~/services/product-family.service";

defineOptions({
  name: "ProductFamilyChange",
});

const search = ref<string | Row>("");
const debounced = refDebounced<string | Row>(search, 200);

const productItems = ref<Row[]>([]);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      try {
        productItems.value = await findFamily(debounced.value);
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
      }
    }
  }
);

const close = () => {
  search.value = "";
  productItems.value = [];
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="400px"
    @after-leave="close"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="flat"
        color="primary"
        text="TROCAR FAMILIA DO PRODUTO"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="BUSCAR FAMILIA" rounded="xl">
        <v-card-text class="mt-5">
          <UiCombobox
            v-model="search"
            v-maska="'+'"
            label="Digite a referencia"
            :items="productItems"
            item-title="id"
            item-value="id"
            :multiple="false"
            :hide-details="true"
            :return-object="true"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <ProductFamilyChangeSave
            :produto-chave="(search as Row).id"
            :disabled="typeof search != 'object' || search == null"
            @close="isActive.value = false"
          />

          <v-spacer />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
