<script setup lang="ts">
import Prepend from "./Prepend.vue";
import Default from "./Default.vue";
import Append from "./Append.vue";
import Import from "./Import.vue";

const { $device } = useNuxtApp();

const store = useGridStore();
const { drawer } = storeToRefs(store);

const availableOrHidden = ref<boolean>(false);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    :width="300"
    :location="$device.isMobile ? 'bottom' : undefined"
    @update:model-value="availableOrHidden = false"
  >
    <template #prepend>
      <Prepend />
    </template>

    <Default :available-or-hidden="availableOrHidden" />

    <template #append>
      <Append
        :available-or-hidden="availableOrHidden"
        @switch="availableOrHidden = !availableOrHidden"
      />

      <Import />
    </template>
  </v-navigation-drawer>
</template>
