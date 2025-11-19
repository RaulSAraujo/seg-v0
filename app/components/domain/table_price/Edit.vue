<script setup lang="ts">
import type { Row, Form } from "~/interfaces/TablePrice";

const props = defineProps<{
  item: Row;
}>();

const dialog = ref(false);

const el = ref();

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const update = async (form: Form) => {
  loading.start();

  try {
    const { result } = await $customFetch<{ result: Row[] }>("table-price", {
      method: "PUT",
      body: {
        id: props.item.id,
        ...form,
      },
    });

    $toast().success("Preço balcão atualizado com sucesso.");

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
  }

  loading.finish();
};

watch(
  () => el.value,
  (value: { form: Form }) => {
    if (value && "form" in value) {
      value.form.name = props.item.name;
      value.form.max_price = props.item.max_price;
      value.form.min_price = props.item.min_price;
      value.form.percentage = props.item.percentage;
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="300px">
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

    <TablePriceForm
      ref="el"
      title="EDITAR PREÇO BALCÃO"
      @save="update($event)"
    />
  </v-dialog>
</template>
