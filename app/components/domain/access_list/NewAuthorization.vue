<script setup lang="ts">
const emit = defineEmits(["new"]);

interface Form {
  ip_address: string;
  description: string;
}

const form = reactive<Form>({
  ip_address: "",
  description: "",
});

const dialog = ref(false);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const create = async () => {
  loading.start();

  try {
    const res = await $customFetch("ip-access-list", {
      method: "POST",
      body: form,
    });

    $toast().success("Nova autorização cadastrada.");

    emit("new", res);

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-plus" density="compact" variant="plain" />
    </template>

    <v-card rounded="xl" title="NOVA AUTORIZAÇÃO">
      <template #text>
        <v-row dense>
          <v-col cols="12">
            <UiTextField v-model="form.description" label="Descrição" />
          </v-col>

          <v-col cols="12">
            <UiTextField v-model="form.ip_address" label="Endereço de ip" />
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
          @click="create"
        />
        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
