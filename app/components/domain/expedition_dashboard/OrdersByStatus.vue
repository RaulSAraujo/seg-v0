<script lang="ts" setup>
import type { AllOrder } from "~/interfaces/ExpeditionDashboard";

const DialogOrderList = defineAsyncComponent(
  () => import("./DialogOrderList.vue")
);

defineProps<{
  allOrders: AllOrder[];
}>();
</script>

<template>
  <span class="text-h4 text-primary font-weight-black">PEDIDOS POR STATUS</span>

  <v-row v-if="allOrders.length != 0" class="px-5 mt-1 mb-3">
    <v-col
      v-for="item in allOrders"
      :key="item.status"
      class="d-flex flex-column bg-primary rounded-xl mx-2 position-relative"
    >
      <DialogOrderList v-if="item.status == 'EMBALADO'" />

      <div class="d-flex flex-column align-center">
        <span class="text-h1">{{ item.count }}</span>
        <span class="text-button-sheet">
          {{ item.status }} ({{ item.percentage }}%)
        </span>
      </div>
    </v-col>
  </v-row>

  <v-row v-else class="px-5 mt-1 mb-3">
    <v-col>
      <v-skeleton-loader color="transparent" type="image" />
    </v-col>
    <v-col>
      <v-skeleton-loader color="transparent" type="image" />
    </v-col>
    <v-col>
      <v-skeleton-loader color="transparent" type="image" />
    </v-col>
    <v-col>
      <v-skeleton-loader color="transparent" type="image" />
    </v-col>
  </v-row>
</template>

<style scoped>
.text-button-sheet {
  font-size: 1rem;
  font-weight: 500;
  line-height: 2.667;
  letter-spacing: 0.1666666667em;
  text-transform: uppercase;
}
</style>
