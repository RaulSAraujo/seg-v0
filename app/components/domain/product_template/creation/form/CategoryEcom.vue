<script lang="ts" setup>
import type { CategoryEcom } from "~/interfaces/CategoryEcom";

const props = defineProps<{
  apparatusId?: number;
}>();

const emit = defineEmits(["updateCategoryId"]);

const { $customFetch } = useNuxtApp();

const categories = ref<{ category: string; count: number }[]>([]);

const loading = ref(false);

const categoryName = ref<string | null>(null);

watch(
  () => props.apparatusId,
  async (value) => {
    if (typeof value == "number") {
      categoryName.value = null;

      try {
        loading.value = true;

        const res = await $customFetch<{ category: string; count: number }[]>(
          "template-config/categories",
          {
            query: {
              apparatus_id: value,
            },
          }
        );

        if (res.length === 0) {
          $toast().info("Esta categoria não possui configurações.");
        } else if (res.length > 1) {
          $toast().warning("Configuração existente.");
        }

        categories.value = res.map((e) => ({
          category: e.category.toUpperCase(),
          count: e.count,
        }));

        loading.value = false;
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);

        loading.value = false;
      }
    } else {
      categoryName.value = null;
    }
  }
);

watch(
  () => categoryName.value,
  async (value) => {
    if (value == null || value == "") return;

    try {
      const res = await $customFetch<CategoryEcom>(
        "template-config/category-ecom",
        {
          query: {
            category_name: value,
          },
        }
      );

      if (!res.rows[0]) return;

      emit("updateCategoryId", res.rows[0].id);
    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(`${err.statusText ?? err.message}`);
    }
  }
);
</script>

<template>
  <UiCombobox
    v-model="categoryName"
    label="Categoria"
    :items="categories"
    item-title="category"
    item-value="category"
    :loading="loading"
    :disabled="!apparatusId || categories.length == 0"
  />
</template>
