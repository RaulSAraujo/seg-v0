<script lang="ts" setup>
import type { Page } from "~/interfaces/Menu";

const { menus } = useMenus();

const pages = ref<Page[]>([]);
watch(menus, (menusValue) => {
  if (menusValue) {
    pages.value = menusValue.flatMap((e) => e.items);
  }
}, { immediate: true });
</script>

<template>
  <UiCombobox
    label="Tela"
    :items="pages"
    item-title="title"
    item-value="title"
    return-object
  />
</template>
