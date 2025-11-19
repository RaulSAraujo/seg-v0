<script setup lang="ts">
import type { Menu } from "~/interfaces/Menu";
import type { ConfigMenu } from "~/interfaces/ConfigMenu";

const { $device } = useNuxtApp();
const config = useRuntimeConfig();

const theme = useTheme();

const { data: user } = useAuth();

const drawer = useState<boolean>("drawer-mobile", () => false);

const { menus, configs } = useMenus();
</script>

<template>
  <v-app-bar app :color="!theme.global.current.value.dark ? 'primary' : ''">
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$device.isDesktop"
        icon="mdi-home"
        :to="{ name: 'home' }"
        variant="plain"
      />

      <v-app-bar-nav-icon
        v-else
        variant="text"
        @click.stop="drawer = !drawer"
      />
    </template>

    <v-app-bar-title v-if="$device.isDesktop">
      <ClientOnly>
        <HeaderMenu :menus="(menus || []) as Menu[]" :configs-menu="(configs || []) as ConfigMenu[]" />
        <template #fallback>
          <div style="height: 60px;" />
        </template>
      </ClientOnly>
    </v-app-bar-title>

    <template #append>
      <Search />

      <v-btn
        icon="mdi-face-agent"
        variant="plain"
        :to="{
          name: 'support-request',
        }"
      />

      <ClientOnly>
        <HeaderNotifications />

        <template #fallback>
          <v-skeleton-loader width="60px" color="transparent" type="heading" />
        </template>
      </ClientOnly>

      <HeaderTheme />
      <HeaderAvatar />
    </template>
  </v-app-bar>
</template>
