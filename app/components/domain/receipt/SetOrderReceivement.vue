<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  items: Row[];
}>();

interface Form {
  id: number | null;
  invoice_number: number | null;
  invoice_series: number | null;
}

const form = reactive<Form>({
  id: null,
  invoice_number: null,
  invoice_series: null,
});

const active = computed(() => props.items.length > 0);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const dialog = ref(false);

const create = async () => {
  loading.start();

  try {
    await $customFetch("purchase-control/set-order-to-receivement", {
      method: "POST",
      body: form,
    });

    $toast().success("Recebimento iniciado.");

    dialog.value = false;

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};

const close = () => {
  form.id = null;
  form.invoice_number = null;
  form.invoice_series = null;
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="350px"
    @after-leave="close"
  >
    <template #activator="{ props: activator }">
      <v-tooltip
        location="left"
        text="Iniciar recebimento"
        content-class="bg-primary"
      >
        <template #activator="{ props: tooltip }">
          <v-fab
            v-if="!active"
            icon="mdi-package-up"
            color="primary"
            class="button"
            style="position: fixed; bottom: 30px; right: 15px"
            v-bind="Object.assign({}, activator, tooltip)"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl" title="INICIAR RECEBIMENTO">
        <template #text>
          <UiTextField v-model="form.id" label="Id pedido seg" class="mb-2" />
          <UiTextField
            v-model="form.invoice_number"
            label="Número da nota"
            class="mb-2"
          />
          <UiTextField v-model="form.invoice_series" label="Série da nota" />
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="create"
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
