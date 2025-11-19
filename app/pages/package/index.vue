<script setup lang="ts">
import { createDefaultPackage } from "~/factories/current/packageFactory";

import type { Row } from "~/interfaces/Package";

useHead({
  titleTemplate: `Embalagens - %s`,
});

definePageMeta({
  path: "/embalagens",
});

const item = ref<Row>({} as Row);
const dialog = ref<boolean>(false);
const method = ref<"POST" | "PUT">("POST");

function setCreateItem() {
  method.value = "POST";
  dialog.value = true;
  item.value = createDefaultPackage();
}

function setUpdateItem(row: Row) {
  method.value = "PUT";
  dialog.value = true;
  item.value = row;
}
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">EMBALAGENS</span>

    <PackageFilter @active="setCreateItem" />

    <PackageTable @update-item="setUpdateItem" />

    <PackageDialog
      v-model="dialog"
      :method="method"
      :item="item"
      @close="dialog = false"
    />
  </div>
</template>
