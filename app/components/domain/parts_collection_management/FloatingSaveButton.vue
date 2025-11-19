<script setup lang="ts">
import type { ServiceOrderProduct } from "~/interfaces/PartsCollectionManagement";

const props = defineProps<{
  methodRest: "POST" | "PUT";
}>();

const partsCollection = usePartsCollectionStore();
const { form, selected } = storeToRefs(partsCollection);

const { params } = useRoute();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const router = useRouter();

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const { isDate, databaseDate } = useDateConversion();

const clickSave = () => {
  if (selected.value.length == 0 && props.methodRest == "POST") {
    snackbar.value = true;
  } else {
    save();
  }
};

const save = async () => {
  loading.start();

  const newForm = { ...form.value };

  if (selected.value[0]) {
    const product = selected.value[0];

    newForm.name = product.name;

    newForm.description = product.description;

    newForm.quantity = product.quantity;
  }

  if (isDate(newForm.end_date_os)) {
    newForm.end_date_os = databaseDate(newForm.end_date_os);
  }

  if (isDate(newForm.limit_date_storage)) {
    newForm.limit_date_storage = databaseDate(newForm.limit_date_storage);
  }

  if (isDate(newForm.collection_date_os)) {
    newForm.collection_date_os = databaseDate(newForm.collection_date_os);
  }

  if (isDate(newForm.completion_deadline ?? "")) {
    newForm.completion_deadline = databaseDate(
      newForm.completion_deadline ?? ""
    );
  } else {
    newForm.completion_deadline = null;
  }

  if (isDate(newForm.warehouse_delivery_date ?? "")) {
    newForm.warehouse_delivery_date = databaseDate(
      newForm.warehouse_delivery_date ?? ""
    );
  } else {
    newForm.warehouse_delivery_date = null;
  }

  if (isDate(newForm.requested_collection_date ?? "")) {
    newForm.requested_collection_date = databaseDate(
      newForm.requested_collection_date ?? ""
    );
  } else {
    newForm.requested_collection_date = null;
  }

  if (isDate(newForm.final_date ?? "")) {
    newForm.final_date = databaseDate(newForm.final_date ?? "");
  } else {
    newForm.final_date = null;
  }

  try {
    await $customFetch<ServiceOrderProduct>("parts-collection-management", {
      method: props.methodRest,
      body: {
        id: props.methodRest == "PUT" ? params.id : undefined,
        ...newForm,
      },
    });

    $toast().success(
      props.methodRest == "POST"
        ? "Novo registro criado."
        : "Registro atualizado com sucesso."
    );

    if (props.methodRest == "POST") {
      router.back();
    }

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: fixed; bottom: 30px; right: 15px"
    @click="clickSave"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <p class="text-body-2 text-grey-lighten-2">
      Deseja continuar sem selecionar nenhum produto ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="save"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
