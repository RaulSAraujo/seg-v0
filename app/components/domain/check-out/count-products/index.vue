<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { dialog, ecomOrderId, box, pointSale, colorSeller } = storeToRefs(checkOutStore);

watch(
  () => dialog.value,
  (value) => {
    if (value == false) {
      checkOutStore.eventInterruptedFlow();
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" width="80vw" persistent no-click-animation>
    <v-toolbar
      flat
      extended
      rounded="t-xl"
      extension-height="20"
      :color="colorSeller"
      class="text-white text-center mb-1"
    >
      <template #default>
        <div class="ma-auto py-2">
          <span class="text-h2 font-weight-bold">
            {{ pointSale }}
          </span>
        </div>
      </template>
    </v-toolbar>

    <v-card title="CONTAGEM DOS PRODUTOS" :subtitle="`PED.${ecomOrderId}`" rounded="lg">
      <template #append>
        <v-icon icon="mdi-package-variant" size="60" />

        <span class="text-h2 font-weight-black ml-2">
          {{ box.toUpperCase() }}
        </span>

        <v-btn icon="mdi-close" variant="plain" color="red" @click="dialog = false" />
      </template>

      <template #text>
        <CheckOutCountProductsList />
      </template>
    </v-card>

    <CheckOutCountProductsInput />
  </v-dialog>
</template>
