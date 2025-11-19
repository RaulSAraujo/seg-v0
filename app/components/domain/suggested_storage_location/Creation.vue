<script setup lang="ts">
import type { Row } from "~/interfaces/Supplier";

interface Body {
  brand: string | null;
  category: string | null;
  apparatus: string | null;
  storage_location: string;
}

const form = reactive<Body>({
  brand: null,
  category: null,
  apparatus: null,
  storage_location: "",
});

const warehouse = ref<{ id: number; name: string } | null>(null);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await $customFetch<Row>("suggested-storage-location", {
      method: "POST",
      body: {
        ...form,
        area: form.storage_location?.substring(0, 2),
        preferential: false,
        warehouse_id: warehouse.value?.id,
        warehouse_name: warehouse.value?.name,
      },
    });

    $toast().success("Nova sugestão de local de armazenem criada com sucesso.");

    close();

    items.value.splice(0, 0, res);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const close = () => {
  form.brand = null;
  form.category = null;
  form.apparatus = null;
  form.storage_location = "";
  warehouse.value = null;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="300px"
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
      <v-card rounded="xl" title="SUGESTÃO DE ARMAZENAGEM">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <SuggestedStorageLocationInputBrand v-model="form.brand" />
            </v-col>

            <v-col cols="12">
              <UiFindServer
                v-model="form.category"
                label="Categoria"
                base-url="product-categories-erp"
                param-search="category_name"
                item-title="category_name"
                item-value="category_name"
                :clearable="true"
                :return-object="false"
              />
            </v-col>

            <v-col cols="12">
              <SuggestedStorageLocationInputApparatus
                v-model="form.apparatus"
              />
            </v-col>

            <v-col cols="12">
              <SuggestedStorageLocationInputWarehouse v-model="warehouse" />
            </v-col>

            <v-col cols="12">
              <UiTextField
                v-model="form.storage_location"
                v-maska="'##-##-##-##-##'"
                label="Local"
              />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
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
