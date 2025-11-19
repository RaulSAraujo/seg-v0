<script lang="ts" setup>
import Title from "./title/index.vue";
import Others from "./others/index.vue";
import Metrics from "./metrics/index.vue";
import Products from "./products/Index.vue";
import Information from "./information/index.vue";
import GroupFloating from "./group_floating/index.vue";

defineOptions({
  name: "SacForm",
});

defineProps<{
  title: string;
  methodRest: "POST" | "PUT";
}>();

const sacProductsStore = useSacProductsStore();
const { productsChanged } = storeToRefs(sacProductsStore);

const sacStore = useSacStore();
const { paymentType } = storeToRefs(sacStore);

const sacMetricsStore = useSacMetricsStore();
const sacQuoteFreightStore = useSacQuoteFreightStore();

watch(
  () => productsChanged.value,
  () => {
    if (productsChanged.value) {
      sacMetricsStore.resetProps();
      paymentType.value = undefined;
      sacQuoteFreightStore.resetProps();

      productsChanged.value = false;
    }
  }
);
</script>

<template>
  <v-sheet
    class="mx-2 elevation-0"
    rounded="xl"
    elevation="5"
    color="transparent"
  >
    <Title :title="title" />

    <Information />

    <Products />

    <v-row class="mt-2">
      <v-col cols="12" lg="7" xl="8" xxl="9">
        <Others />
      </v-col>

      <v-col cols="12" lg="5" xl="4" xxl="3">
        <Metrics />
      </v-col>
    </v-row>

    <GroupFloating :method-rest="methodRest" />
  </v-sheet>
</template>
