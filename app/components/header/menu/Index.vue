<script setup lang="ts">
import type { Menu } from "~/interfaces/Menu";
import type { ConfigMenu } from "~/interfaces/ConfigMenu";

defineProps<{
  menus: Menu[];
  configsMenu: ConfigMenu[];
}>();
</script>

<template>
  <v-menu
    v-for="(menu, i) in menus"
    :key="i"
    location="bottom"
    transition="slide-y-transition"
    offset="5 50"
    width="250px"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="plain"
        :text="menu.title"
        height="60px"
        class="text-uppercase"
      />
    </template>

    <HeaderMenuList :items="menu.items" />
  </v-menu>

  <v-menu
    v-for="(menu, i) in configsMenu"
    :key="i"
    location="bottom"
    transition="slide-y-transition"
    offset="5 50"
    width="250px"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="plain"
        :text="menu.title"
        height="60px"
        class="text-uppercase"
      />
    </template>

    <HeaderMenuConfigList :sub-menus="menu.subMenus" />
  </v-menu>
</template>

<style>
.v-theme--light .v-list-item--variant-plain {
  opacity: 0.75;
  color: black;
}

.v-theme--light .v-list-item--variant-plain:hover {
  opacity: 1;
  color: black;
}
</style>
