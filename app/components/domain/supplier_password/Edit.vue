<script setup lang="ts">
import type { Row, Form } from "~/interfaces/SupplierPasswords";
import { updateSupplierPasswords } from "~/services/supplier-password.service";

defineOptions({
  name: "SupplierPasswordEdit",
});

const props = defineProps<{
  item: Row;
}>();

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const el = ref();
const dialog = ref(false);
const loading = ref(false);

const update = async (form: Form) => {
  loading.value = true;

  try {
    const { result } = await updateSupplierPasswords({
      id: props.item.id,
      ...form,
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
    loading.value = false;
  }
};

watch(
  () => el.value,
  (value: { form: Form }) => {
    if (value && "form" in value) {
      value.form.supplier = props.item.supplier;
      value.form.supplier_username = props.item.supplier_username;
      value.form.supplier_password = props.item.supplier_password;
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

    <SupplierPasswordForm
      ref="el"
      title="EDITAR SENHA"
      :loading="loading"
      @save="update($event)"
    />
  </v-dialog>
</template>
