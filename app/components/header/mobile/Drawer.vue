<script lang="ts" setup>
import type { Menu } from "~/interfaces/Menu";

const { data: user } = useAuth();
const config = useRuntimeConfig();

const drawer = useState<boolean>("drawer-mobile", () => false);

const { menus } = useMenus();
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list :lines="false" variant="plain" nav class="rounded-xl">
      <v-list-item
        title="Home"
        prepend-icon="mdi-home"
        value="home"
        color="primary"
        to="/inicio"
      />

      <div v-for="(menu, i) in menus || []" :key="i">
        <v-list-item
          v-for="(item, a) in menu.items"
          :key="a"
          :value="item"
          color="primary"
          :to="{ name: `${item.name}` }"
        >
          <template #prepend>
            <v-icon :icon="`${item.icon}`" />
          </template>

          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
