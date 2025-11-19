<script setup lang="ts">
import type { Row } from "~/interfaces/LimitDate";

defineOptions({
  name: "RegionCreation",
});

interface Form {
  region: string;
  color: string;
}

const form = reactive<Form>({
  region: "",
  color: "",
});

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await $customFetch<Row>("several-tables/region", {
      method: "POST",
      body: form,
    });

    $toast().success("Nova região cadastrada.");

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
  form.region = "";
  form.color = "";
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
      <v-card rounded="xl" title="NOVA REGIÃO">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiTextField v-model="form.region" label="Região" />
            </v-col>
            <v-col cols="12">
              <UiTextField v-model="form.color" label="Cor" />
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
