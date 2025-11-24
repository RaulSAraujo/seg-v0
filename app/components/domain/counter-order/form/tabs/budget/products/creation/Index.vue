<script lang="ts" setup>
import Find from "./Find.vue";
import Table from "./Table.vue";
import { createCounterOrderProduct } from "~/services/counter-order.service";

import type { FetchError } from "ofetch";
import type { RowWithRelationship } from "~/interfaces/ProductSell";

defineOptions({
  name: "CounterOrderBudgetProductsCreation",
});

const { params } = useRoute();
const loadingIndicator = useLoadingIndicator();

const dialog = ref(false);
const loading = ref(false);
const productsFound = ref<RowWithRelationship[]>([]);

const counterOrderProductsStore = useCounterOrderProductsStore();
const { products } = storeToRefs(counterOrderProductsStore);

const add = async (item: RowWithRelationship) => {
  if (item.type == "KIT") {
    return addKit(item);
  }

  try {
    loadingIndicator.start();

    const productData = {
      quantity: 1,
      name: item.Family.SellPreference?.name ?? "",
      description: item.Family.SellPreference?.description ?? "",
      produto_chave: item.Family.SellPreference?.produto_chave ?? 0,
      counter_price: item.Family.SellPreference?.counter_price ?? "",
      erp_product_id: item.Family.SellPreference?.erp_product_id ?? 0,
    };

    if (params.id) {
      const res = await createCounterOrderProduct(
        params.id as string,
        productData
      );

      products.value.push(res);
    } else {
      products.value.push(productData);
    }

    dialog.value = false;
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusText}`);
  } finally {
    loadingIndicator.finish();
  }
};

const addKit = async (item: RowWithRelationship) => {
  try {
    loadingIndicator.start();

    if (!item.Kit || item.Kit.Families.length === 0) {
      $toast().error("O kit não possui produtos.");

      return;
    }

    for (const product of item.Kit.Families) {
      const productData = {
        name: product.SellPreference?.name ?? "",
        quantity: product.KitFamily?.qtd_itens ?? 1,
        description: product.SellPreference?.description ?? "",
        produto_chave: product.SellPreference?.produto_chave ?? 0,
        counter_price: product.SellPreference?.counter_price ?? "",
        erp_product_id: product.SellPreference?.erp_product_id ?? 0,
      };

      if (params.id) {
        const res = await createCounterOrderProduct(
          params.id as string,
          productData
        );

        products.value.push(res);
      } else {
        products.value.push(productData);
      }
    }

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loadingIndicator.finish();
  }
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="75vw">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        color="primary"
        text="ADD"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default>
      <v-card title="ADICIONAR NOVO PRODUTO" rounded="xl">
        <template #text>
          <Find
            @products="productsFound = $event"
            @loading="loading = $event"
          />

          <Table :products="productsFound" :loading="loading" @add="add" />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
