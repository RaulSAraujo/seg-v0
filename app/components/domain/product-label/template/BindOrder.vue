<script lang="ts" setup>
import type {
  StockTagControl,
  Row,
} from "~/interfaces/StockTagControl";

const props = defineProps<{
  id: number;
}>();

const form = reactive({
  ecom_order_id: "",
});

const dialog = ref(false);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const validationTags = async () => {
  try {
    loading.value = true;

    const res = await $customFetch<StockTagControl>("stock-tag-control", {
      method: "GET",
      query: {
        ecom_order_id: form.ecom_order_id,
      },
    });

    if (res.rows.length > 0) {
      snackbar.value = true;
    } else {
      await linkTag();
    }

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};

const linkTag = async () => {
  try {
    await $customFetch("stock-tag-control/bind-order", {
      method: "PUT",
      body: {
        id: props.id,
        ...form,
      },
    });

    $toast().success("Vinculo realizado com sucesso.");

    const find = (items.value as Row[]).find((e) => e.id == props.id);

    if (find) {
      find.ecom_order_id = parseInt(form.ecom_order_id);
    }

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const clear = () => {
  form.ecom_order_id = "";
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="250px"
    @after-leave="clear"
  >
    <template #activator="{ props: dialogProps }">
      <v-tooltip location="top" text="Vincular tag" content-class="bg-purple">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialogProps)"
            icon="mdi-tag-plus"
            size="small"
            density="comfortable"
            variant="plain"
            color="deep-purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="VINCULAR TAG" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiTextField v-model="form.ecom_order_id" label="Pedido ecom" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            class="mb-2"
            base-color="primary"
            width="8vw"
            variant="flat"
            text="SALVAR"
            :loading="loading"
            @click="validationTags"
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Vincular tag</div>

    <p class="text-caption text-grey-lighten-2">
      Este pedido ja possui tags vinculadas, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="linkTag"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
