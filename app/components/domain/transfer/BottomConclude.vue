<script setup lang="ts">
import type { Row } from "~/interfaces/Product";

const items = useState<Row[]>("items-stock-transfer", () => []);

interface Form {
  origin_warehouse?: string;
  target_warehouse?: string;
  request_reason?: string;
  observation?: string;
}

const form = reactive<Form>({
  origin_warehouse: undefined,
  target_warehouse: undefined,
  request_reason: undefined,
  observation: undefined,
});

const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

const loading = ref(false);

const create = async () => {
  try {
    loading.value = true;

    const newMapItems = items.value.map((e) => ({
      id: e.id,
      name: e.name,
      quantity: e.quantity,
    }));

    const res = await $customFetch<{ message: string }>(
      "stock-transfer/transfer-warehouse",
      {
        method: "POST",
        body: {
          ...form,
          products: newMapItems,
        },
      }
    );

    $toast().success(res.message);

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};

const close = () => {};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="20vw"
    @after-leave="close"
  >
    <template #activator="{ props }">
      <v-fab
        v-bind="props"
        icon="mdi-swap-horizontal"
        color="primary"
        style="position: fixed; bottom: 30px; right: 15px"
      />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl">
        <template #title>
          <span class="text-primary">CONCLUIR TRANSFERENCIA</span>
        </template>

        <template #text>
          <v-card>
            <v-row dense class="mt-2">
              <v-col cols="12">
                <TransferWarehouseOrigin v-model="form.origin_warehouse" />
              </v-col>

              <v-col cols="12">
                <TransferWarehouseDestination v-model="form.target_warehouse" />
              </v-col>

              <v-col cols="12">
                <TransferRequestReasons v-model="form.request_reason" />
              </v-col>

              <v-col cols="12">
                <UiTextArea
                  v-model="form.observation"
                  label="Observação"
                  :rows="3"
                />
              </v-col>
            </v-row>
          </v-card>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            width="8vw"
            variant="flat"
            :loading="loading"
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

<style scoped>
:deep(.v-avatar.v-avatar--size-default) {
  --v-avatar-height: 150px;
}
</style>
