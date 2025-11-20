<script lang="ts" setup>
import { createDefaultWarranty } from "~/factories/warrantyFactory";
import { useWarrantyById } from "~/composables/warranty/useWarrantyById";
import { initialWarrantyTransformData } from "~/composables/warranty/utils/transformeData";

import type { RowWithRelationship } from "~/interfaces/Warranty";

const { params } = useRoute();

useHead({
  titleTemplate: `Garantia #${params.id} - %s`,
});

definePageMeta({
  path: "/garantia/:id",
});

const orders = ref<RowWithRelationship>(createDefaultWarranty());

const { data, status } = useWarrantyById({ lazy: true });

onMounted(() => {
  if (status.value === "error") return;

  const transformed = initialWarrantyTransformData(data.value);

  orders.value = transformed;
});

onBeforeRouteLeave((to, from, next) => {
  if (to.name == "warranty" || to.name == "warranty-id") {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para garantia"
        :to="{
          name: 'warranty',
        }"
      />
    </div>

    <v-sheet
      class="mx-2 elevation-0"
      rounded="xl"
      elevation="5"
      color="transparent"
    >
      <WarrantyForm
        :orders="orders"
        :title="`Garantia #${params.id}`"
        :active-redirect-tray="true"
        methods-rest="PUT"
        :disabled-products="true"
      />
    </v-sheet>
  </div>
</template>
