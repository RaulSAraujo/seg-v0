<script lang="ts" setup>
import Find from "./Find.vue";
import Table from "./table/index.vue";

import { productOfSacSaleApi } from "~/services/sac.service";

import type { RowWithRelationship } from "~/interfaces/Product";

const loading = useLoadingIndicator();

const sacProductsStore = useSacProductsStore();

const loadingTable = ref(false);
const products = ref<RowWithRelationship[]>([]);

const add = async (item: RowWithRelationship, quantity: number) => {
  try {
    loading.start();

    const res = await productOfSacSaleApi({
      quantity: quantity,
      manufacturer_code: item.name ?? "",
      auxiliary_code: item.produto_chave ?? 0,
    });

    sacProductsStore.add(res);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="75vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        color="primary"
        text="ADD"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="ADICIONAR NOVO PRODUTO" rounded="xl">
        <template #text>
          <Find
            @loading="loadingTable = $event"
            @set-products="products = $event"
          />

          <Table
            :products="products"
            :loading="loadingTable"
            @add="
              add($event.item, $event.quantity);

              isActive.value = false;
            "
          />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
