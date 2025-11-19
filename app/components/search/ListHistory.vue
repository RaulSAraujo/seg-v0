<script lang="ts" setup>
import type { Page } from "~/interfaces/Menu";

const props = defineProps<{
  history: Page[];
}>();

defineEmits(["remove", "closeDialog"]);

const router = useRouter();
const config = useRuntimeConfig();

const processedItems = computed(() => {
  return props.history.map((item) => {
    const publicVersion = config.public.version || "current";
    const validationVersion = item.backUrl.includes(publicVersion);
    const version = validationVersion ? "v1" : "current";
    const routeName = `${version}-${item.name}`;
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
  <v-list color="primary">
    <v-list-subheader>
      <v-icon icon="mdi-history" />

      Buscas recentes
    </v-list-subheader>

    <v-list-item
      v-for="(page, index) in processedItems"
      :key="index"
      :to="page.to"
      @click="$emit('closeDialog')"
    >
      <template #title>
        <div class="d-flex align-center">
          <span class="text-caption text-grey">{{ page.menu }}</span>
          <v-icon icon="mdi-chevron-right" color="grey" />
          <span class="text-caption text-grey">{{ page.title }}</span>
        </div>
      </template>

      <template #append>
        <v-btn
          icon="mdi-delete"
          variant="plain"
          size="small"
          color="pink"
          @click="$emit('remove', index)"
        />
      </template>
    </v-list-item>
  </v-list>
</template>
