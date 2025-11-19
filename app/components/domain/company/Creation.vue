<script setup lang="ts">
import type { Row } from "~/interfaces/Company";

interface Form {
  erp_id: string;
  cnpj: string;
  warehouse: string | undefined;
  fantasy_name: string;
  corporate_name: string;
}

const form = reactive<Form>({
  erp_id: "",
  cnpj: "",
  warehouse: undefined,
  fantasy_name: "",
  corporate_name: "",
});

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await $customFetch<Row>("companies", {
      method: "POST",
      body: form,
    });

    $toast().success("Novo empresa cadastrada.");

    items.value.splice(0, 0, res);

    items.value.pop();

    totalItems.value += 1;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  form.erp_id = "";
  form.cnpj = "";
  form.warehouse = undefined;
  form.fantasy_name = "";
  form.corporate_name = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVA EMPRESA">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiTextField v-model="form.erp_id" label="Id erp" />
            </v-col>
            <v-col cols="12">
              <UiTextField
                v-model="form.cnpj"
                v-maska="'##.###.###/####-##'"
                label="CNPJ"
                placeholder="__.___.___/____-__"
              />
            </v-col>
            <v-col cols="12">
              <CompanyWarehouse v-model="form.warehouse" />
            </v-col>
            <v-col cols="12">
              <UiTextField v-model="form.fantasy_name" label="Nome fantasia" />
            </v-col>
            <v-col cols="12">
              <UiTextField v-model="form.corporate_name" label="Razão social" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            class="mb-2"
            color="primary"
            width="8vw"
            variant="flat"
            text="SALVAR"
            @click="
              async () => {
                await create();

                isActive.value = false;
              }
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
