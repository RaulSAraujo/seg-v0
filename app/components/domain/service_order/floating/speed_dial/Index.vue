<script lang="ts" setup>
import Budget from "./Budget.vue";
import RrmForm from "./RrmForm.vue";
import EntryProof from "./EntryProof.vue";
import ServiceOrder from "./ServiceOrder.vue";
import Complementary from "./Complementary.vue";
import ProofOfDelivery from "./ProofOfDelivery.vue";
</script>

<template>
  <v-speed-dial
    id="speedDial"
    location="top start"
    scroll-strategy="close"
    transition="scale-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-fab
        v-bind="activatorProps"
        icon="mdi-format-list-bulleted"
        class="button"
        color="indigo-accent-2"
      />
    </template>

    <EntryProof key="1" />

    <ProofOfDelivery key="2" />

    <Complementary key="3" />

    <Budget key="4" />

    <ServiceOrder key="5" />

    <RrmForm key="6" />
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
