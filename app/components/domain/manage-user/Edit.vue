<script setup lang="ts">
import type { Row, Form } from "~/interfaces/User";

defineOptions({
  name: "ManageUserEdit",
});

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

    if (form.password == "") {
      form.password = undefined;
    }

    const { result } = await $customFetch<{ result: Row[] }>("user", {
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
      value.form.name = props.item.name;
      value.form.username = props.item.username;
      value.form.password = "";
      value.form.group_id = props.item.group_id;
      value.form.active = props.item.active;
      value.form.is_admin = props.item.is_admin;
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

    <ManageUserForm ref="el" title="EDITAR USUÁRIO" @save="update($event)" />
  </v-dialog>
</template>
