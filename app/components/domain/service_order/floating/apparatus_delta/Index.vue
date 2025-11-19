<script lang="ts" setup>
import SaleReceipt from "./SaleReceipt.vue";
import DonationTerm from "./DonationTerm.vue";
import PurchaseReceipt from "./PurchaseReceipt.vue";
import Complementary from "../speed_dial/Complementary.vue";
</script>

<template>
  <v-speed-dial
    id="speedDial"
    transition="scale-transition"
    location="top start"
    scroll-strategy="close"
  >
    <template #activator="{ props: activatorProps }">
      <v-fab
        v-bind="activatorProps"
        class="button"
        icon="mdi-format-list-bulleted"
        color="indigo-accent-2"
      />
    </template>

    <DonationTerm key="1" />

    <PurchaseReceipt key="2" />

    <SaleReceipt key="3" />

    <Complementary key="4" />
  </v-speed-dial>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
