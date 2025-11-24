<script lang="ts" setup>
const { $customFetch } = useNuxtApp();

const dialog = ref(false);

const packedOrders = ref<string[]>([]);

const loading = ref(false);

watch(
  () => dialog.value,
  async (value) => {
    if (value == true) {
      loading.value = true;

      const res = await $customFetch<string[]>("order/get-packed-orders-id");

      packedOrders.value = res;

      loading.value = false;
    } else {
      packedOrders.value = [];
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-open-in-new"
        variant="plain"
        density="compact"
        style="z-index: 999; position: absolute; right: 15px; top: 10px"
      />
    </template>

    <v-card rounded="xl" title="PEDIDOS EMBALADOS">
      <template #text>
        <v-progress-linear v-if="loading" indeterminate color="primary" />

        <v-virtual-scroll :height="300" :items="packedOrders">
          <template #default="{ item }">
            <div class="pa-2 text-center">
              {{ item }}
            </div>

            <v-divider />
          </template>
        </v-virtual-scroll>
      </template>
    </v-card>
  </v-dialog>
</template>
