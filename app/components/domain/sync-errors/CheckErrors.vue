<script lang="ts" setup>
const props = defineProps<{
  id: string | number;
}>();

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const { capitalizeFirstLetter } = useCapitalize();

const destroy = async () => {
  loading.start();

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $customFetch<Response>("product-sync-errors", {
      method: "DELETE",
      query: {
        id: props.id,
      },
    });

    if (!success) return $toast().error(message);

    $toast().success("Registro validado.");

    loading.finish();

    const index = useArrayFindIndex(
      items.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: Record<string, any>) => e.id == props.id
    );

    items.value.splice(index.value, 1);

    totalItems.value -= 1;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-close-thick"
    variant="plain"
    size="small"
    color="red"
    density="comfortable"
    @click="destroy"
  />
</template>
