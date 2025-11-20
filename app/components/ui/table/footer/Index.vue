<script setup lang="ts">
const { $device } = useNuxtApp();

const store = useTableStore();
const {
  page,
  loading,
  pageCount,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
} = storeToRefs(store);

const { y } = useWindowScroll();

const scrollToTop = () => {
  y.value = 0;
};

watch(itemsPerPage, () => {
  scrollToTop();
});
</script>

<template>
  <div class="table-footer-wrapper">
    <v-row dense justify="space-between" class="pa-2">
      <v-col cols="3">
        <ClientOnly>
          <span id="total-items" class="ml-3 text-caption">
            TOTAL: {{ totalItems }}
          </span>
        </ClientOnly>
      </v-col>

      <v-col cols="5">
        <div class="d-flex flex-rows justify-end align-center">
          <span class="mr-2 text-caption">Itens por página: </span>

          <v-select
            v-model="itemsPerPage"
            density="compact"
            color="primary"
            variant="outlined"
            :items="itemsPerPageOptions"
            item-title="title"
            item-value="value"
            hide-details
            hide-selected
            max-width="100px"
            :menu-props="{
              location: 'top',
            }"
          />

          <v-pagination
            v-model="page"
            :length="pageCount"
            :disabled="loading"
            rounded="lg"
            color="primary"
            :total-visible="$device.isMobile ? 0 : 7"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
