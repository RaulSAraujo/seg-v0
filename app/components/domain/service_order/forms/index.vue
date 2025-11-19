<script lang="ts" setup>
import Client from "./Client.vue";
import Device from "./Device.vue";
import Initial from "./Initial.vue";
import OpenOrders from "./open_orders/index.vue";
import ButtonClients from "./button_clients/index.vue";

defineProps<{
  id: string;
}>();
</script>

<template>
  <div class="pa-5">
    <span class="text-h5 text-primary font-weight-black">OS.{{ id }}</span>

    <OpenOrders />

    <Initial />

    <v-divider class="my-5" color="primary" opacity="0.8" />

    <v-card class="py-2" elevation="0">
      <Client />
    </v-card>

    <ButtonClients />

    <v-divider class="my-5" color="primary" opacity="0.8" />

    <Device />
  </div>
</template>
