<script setup lang="ts">
import type { Row, Form } from "~/interfaces/InvoiceRule";

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
  try {
    loading.start();

    const { result } = await $customFetch<{ result: Row[] }>("invoice-rule", {
      method: "PUT",
      body: {
        id: props.item.id,
        ...form,
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
      value.form.erp_company_id = props.item.erp_company_id;
      value.form.parameter = props.item.parameter;
      value.form.value = props.item.value;
      value.form.route = props.item.route;
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
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

    <InvoicingForm ref="el" title="EDITAR FATURAMENTO" @save="update($event)" />
  </v-dialog>
</template>
