<script setup lang="ts">
import Import from "./Import.vue";
import Append from "./Append.vue";
import Prepend from "./Prepend.vue";
import Default from "./Default.vue";

const { $vuetify } = useNuxtApp();

const store = useFilterStore();
const { drawer: renderComponent } = storeToRefs(store);
const debouncedDrawer = refDebounced<boolean>(renderComponent, 150);

const availableOrHidden = ref<boolean>(false);

const closeAnimation = (event: boolean) => {
  setTimeout(() => {
    renderComponent.value = event;
  }, 150);
};
</script>

<template>
  <v-navigation-drawer
    v-if="renderComponent"
    v-model="debouncedDrawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    :width="300"
    temporary
    @update:model-value="closeAnimation"
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
