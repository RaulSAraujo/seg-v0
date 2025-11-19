<script lang="ts" setup>
import { quoteFreightApi } from "~/services/sac.service";

import type { Header } from "~/interfaces/Header";
import type { QuoteFreight } from "~/interfaces/QuoteFreight";

const loading = useLoadingIndicator();

const sacQuoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacQuoteFreightStore);

const dialog = ref(false);
const select = ref<QuoteFreight[]>([]);
const sacQuoteFreight = ref<QuoteFreight[]>();

const headers = ref<Header[]>([
  { title: "Trasportadora", key: "integrator" },
  { title: "Envio", key: "name" },
  { title: "Informação", key: "information" },
  { title: "Preço", key: "price" },
  { title: "Data estimada entrega", key: "estimated_delivery_date" },
]);

const getQuote = async () => {
  try {
    loading.start();

    const res = await quoteFreightApi();

    sacQuoteFreight.value = res;

    dialog.value = true;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

watch(
  () => select.value,
  (value) => {
    quoteFreight.value = {
      id: 0,
      sac_sale_id: 0,
      created_at: null,
      updated_at: null,
      discount_total: null,
      remaining_quantity: "0.0",
      name: value[0]?.name ?? "",
      integrator: value[0]?.integrator ?? "",
      information: value[0]?.information ?? "",
      estimated_delivery_date: value[0]?.estimated_delivery_date ?? "",
      price: value[0]?.price ?? "0.0",
    };
  }
);
</script>

<template>
  <v-btn
    text="Simular frete"
    density="comfortable"
    color="primary"
    @click="getQuote"
  />

  <v-dialog v-model="dialog" transition="dialog-top-transition" width="50vw">
    <template #default>
      <v-card rounded="xl">
        <template #text>
          <v-data-table
            v-model="select"
            show-select
            select-strategy="single"
            item-value="name"
            :headers="headers"
            :items="sacQuoteFreight"
            disable-sort
            return-object
            items-per-page="-1"
            hide-default-footer
          >
            <template #item.integrator="{ item }">
              <UiTooltip :text="item.integrator" :vw="5" />
            </template>

            <template #item.name="{ item }">
              <UiTooltip :text="item.name" :vw="5" />
            </template>

            <template #item.information="{ item }">
              <UiTooltip :text="item.information" :vw="5" />
            </template>

            <template #item.price="{ item }">
              <UiToLocaleString :value="item.price" />
            </template>

            <template #item.estimated_delivery_date="{ item }">
              <UiTooltip :text="item.estimated_delivery_date" :vw="10" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
