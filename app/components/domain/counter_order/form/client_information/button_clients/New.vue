<script lang="ts" setup>
import { clientWithAddressSchema } from "~/schemas/client";
import { creation } from "~/services/client.service";
import { transformerData } from "~/composables/client/transformeData";

import type { RowWithAddressSingle } from "~/interfaces/Client";

defineOptions({
  name: "ClientInformationNew",
});

const dialog = ref(false);

const router = useRouter();
const loading = useLoadingIndicator();

const { handleSubmit } = useForm<RowWithAddressSingle>({
  validationSchema: clientWithAddressSchema,
  initialValues: {
    flag_client: 0,
    ClientsAddresses: {
      type: "Faturamento",
      country: "BRASIL",
    },
  },
});

const submit = handleSubmit(async (values) => {
  try {
    const newValues = transformerData(values);

    loading.start();

    await creation(newValues);

    $toast().success("Sucesso ao cadastrar novo cliente.");

    router.back();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
});
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="95vw">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        density="comfortable"
        icon="mdi-account-plus"
        base-color="primary"
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
