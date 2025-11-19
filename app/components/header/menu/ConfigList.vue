<script lang="ts" setup>
import type { SubMenu } from "~/interfaces/ConfigMenu";

const props = defineProps<{
  subMenus: SubMenu[];
}>();

const router = useRouter(); // Instância do roteador

// Função computada para processar os itens e validar se as rotas existem
const processedItems = computed(() => {
  return props.subMenus.map((menu) => {
    return {
      title: menu.title,
      pages: menu.pages.map((item) => {
        const routeName = item.name;
        const routeExists = router.hasRoute(routeName); // Verifica se a rota existe

        return {
          ...item,
          to: routeExists ? { name: routeName } : undefined,
          disabled: !routeExists,
        };
      }),
    };
  });
});
</script>

<template>
  <v-list :lines="false" variant="plain" nav class="rounded-xl">
    <v-list-item v-for="(subMenu, a) in processedItems" :key="a" link>
      <v-list-item-title>{{ subMenu.title }}</v-list-item-title>

      <template #append>
        <v-icon icon="mdi-menu-right" size="x-small" style="width: 10px" />
      </template>

      <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
        <v-list :lines="false" variant="plain" nav class="rounded-xl">
          <v-list-item
            v-for="(page, j) in subMenu.pages"
            :key="j"
            link
            :to="page.to"
            :disabled="page.disabled"
            :base-color="page.disabled ? 'grey' : ''"
          >
            <template #prepend>
              <v-icon :icon="`${page.icon}`" />
            </template>

            <v-list-item-title>
              {{ page.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>
  </v-list>
</template>
