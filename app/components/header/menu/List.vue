<script lang="ts" setup>
import type { Page } from "~/interfaces/Menu";

const props = defineProps<{
  items: Page[];
}>();

const router = useRouter(); // Instância do roteador

// Função computada para processar os itens e validar se as rotas existem
const processedItems = computed(() => {
  return props.items.map((item) => {
    const routeName = item.name;
    const routeExists = router.hasRoute(routeName); // Verifica se a rota existe

    return {
      ...item,
      to: routeExists ? { name: routeName } : undefined,
      disabled: !routeExists,
    };
  });
});
</script>

<template>
  <v-list :lines="false" variant="plain" nav class="rounded-xl">
    <v-list-item
      v-for="(item, a) in processedItems"
      :key="a"
      :value="item"
      color="primary"
      :to="item.to"
      :disabled="item.disabled"
      :base-color="item.disabled ? 'grey' : ''"
    >
      <template #prepend>
        <v-icon :icon="`${item.icon}`" />
      </template>

      <v-list-item-title>
        {{ item.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
