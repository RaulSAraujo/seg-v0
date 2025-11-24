<script setup lang="ts">
import type { Row, Form } from "~/interfaces/CustomFilterGrid";

const props = defineProps<{
  item: Row;
}>();

const dialog = ref(false);

const el = ref();

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const { capitalizeFirstLetter } = useCapitalize();

const update = async (form: Form) => {
  try {
    loading.start();

    const newForm = { ...form };

    newForm.label = capitalizeFirstLetter(newForm.label);

    if (newForm.fixed_values) {
      newForm.fixed_values = JSON.parse(newForm.fixed_values);
    }

    const { result } = await $customFetch<{ result: Row[] }>("custom-filters", {
      method: "PUT",
      body: {
        id: props.item.id,
        ...newForm,
      },
    });

    $toast().success("Registro atualizado com sucesso.");

    const find = (items.value as Row[]).find((e) => e.id == props.item.id);

    if (find && result[0]) {
      Object.entries(result[0]).forEach(([key, value]) => {
        if (key in find) {
          (find as unknown as Record<string, unknown>)[key] = value;
        }
      });
    }

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};

watch(
  () => el.value,
  (value: { form: Form }) => {
    if (value && "form" in value) {
      Object.entries(props.item).forEach(([key, itemValue]) => {
        if (key in value.form && typeof itemValue == "boolean") {
          (value.form as unknown as Record<string, unknown>)[key] = itemValue;

          return;
        }

        if (key in value.form && itemValue) {
          (value.form as unknown as Record<string, unknown>)[key] = itemValue;
        }
      });
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="430px">
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="primary"
        density="comfortable"
      />
    </template>

    <CustomFilterGridForm
      ref="el"
      title="EDITAR FILTRO E GRID"
      @save="update($event)"
    />
  </v-dialog>
</template>
