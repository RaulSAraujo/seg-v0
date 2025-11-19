<script lang="ts" setup>
import { useGetSellers } from "~/composables/sac/useGetSellers";

defineOptions({
  name: "SacSellersInput",
});

const { data, status } = useGetSellers({ lazy: true });

const sacStore = useSacStore();
const { seller } = storeToRefs(sacStore);
</script>

<template>
  <UiSelect
    v-if="status == 'success' && data"
    v-model="seller"
    alt="sellers-input"
    label="Local da venda"
    :items="data.values"
  />
</template>
