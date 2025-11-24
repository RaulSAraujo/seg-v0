<script setup lang="ts">
import List from "./List.vue";
import Submit from "./Submit.vue";

import type { Row } from "~/interfaces/Pstatus";

defineOptions({
  name: "ProductStatusTableStatusAssociation",
});

const productStore = useProductStore();
const { productPstatuses, pstatusList, loadingPstatus } = storeToRefs(productStore);

const listPstatus = ref<Row[]>([]);

function updatePstatus(index: number) {
  if (listPstatus.value[index]) {
    listPstatus.value[index].active = !listPstatus.value[index].active;
  }
}

onMounted(async () => {
  await productStore.fetchPstatus();
  listPstatus.value = pstatusList.value.map((e) => ({
    ...e,
    active: productPstatuses.value.some((existing) => existing.id === e.id),
  }));
});
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="400px">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="EDITAR STATUS"
        variant="flat"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="STATUS ASSOCIADOS" rounded="xl">
        <v-card-text class="mt-5">
          <List
            v-if="!loadingPstatus"
            :data="listPstatus"
            @switch="updatePstatus"
          />

          <v-progress-circular v-else color="primary" indeterminate />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <Submit :items="listPstatus" @is-active="isActive.value = false" />

          <v-spacer />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
