<script lang="ts" setup>
import { clientWithAddressSchema } from "~/schemas/client";
import { createCustomerApi } from "~/services/sac.service";
import { createDefaultClient } from "~/factories/clientFactory";

import type { FetchError } from "ofetch";
import type { RowWithAddressSingle } from "~/interfaces/Client";

defineOptions({
  name: "SacForm",
});

const dialog = ref(false);
const loading = ref(false);

const sacStore = useSacStore();
const { seller } = storeToRefs(sacStore);

const { handleSubmit } = useForm<RowWithAddressSingle>({
  validationSchema: clientWithAddressSchema,
  initialValues: createDefaultClient(),
});

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true;

    await createCustomerApi(values);

    $toast().success("Sucesso ao cadastrar novo cliente.");

    dialog.value = false;
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="95vw">
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        density="comfortable"
        icon="mdi-account-plus"
        base-color="primary"
        :disabled="seller == undefined"
        class="mr-2"
      />
    </template>

    <template #default>
      <v-sheet class="pb-12" rounded="xl" elevation="5">
        <ClientForm title="NOVO CLIENTE" @submit="submit" />
      </v-sheet>
    </template>
  </v-dialog>
</template>
