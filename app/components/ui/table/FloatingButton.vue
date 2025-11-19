<script setup lang="ts">
const tableStore = useTableStore();
const { selected, items } = storeToRefs(tableStore);

const { y } = useWindowScroll();

const scrollToTop = () => {
  y.value = 0;
};
</script>

<template>
  <v-fab
    v-if="items.length > 10 && selected.length == 0"
    icon="mdi-chevron-up"
    size="60"
    app
    appear
    color="primary"
    class="button ms-4 mb-4"
    location="bottom start"
    @click="scrollToTop"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
