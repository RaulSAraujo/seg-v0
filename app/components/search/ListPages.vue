<script lang="ts" setup>
import type { Menu, Page } from "~/interfaces/Menu";

const props = defineProps<{
  search: string;
}>();

const emit = defineEmits(["setHistory", "closeDialog"]);

const router = useRouter();
const config = useRuntimeConfig();

const filteredPage = ref<
  Page[] & { to: { name: string } | undefined; disabled: boolean }[]
>([]);

const { menus } = useMenus();
const status = computed(() => menus.value ? 'success' : 'pending');

const pages = ref<Page[]>([]);
watch(menus, (menusValue) => {
  if (menusValue) {
    const items = menusValue.flatMap((e) => e.items);
    pages.value = items;
  }
}, { immediate: true });

const clickItem = (page: Page) => {
  emit("setHistory", page);

  emit("closeDialog");
};

watch(
  () => props.search,
  (value) => {
    const result = pages.value.filter((e) =>
      e.title.toLowerCase().includes(value)
    );

    filteredPage.value = result.map((item) => {
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
  }
);
</script>

<template>
  <v-list v-if="status == 'success'">
    <v-list-subheader>Paginas encontradas</v-list-subheader>

    <v-list-item
      v-for="(page, index) in filteredPage"
      :key="index"
      :to="page.to"
      @click="clickItem(page)"
    >
      <template #title>
        <div class="d-flex align-center">
          <span class="text-caption text-grey">{{ page.menu }}</span>
          <v-icon icon="mdi-chevron-right" color="grey" />
          <span class="text-caption text-grey">{{ page.title }}</span>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>
