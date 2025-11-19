<script setup lang="ts">
import { creation } from "~/services/client.service";
import { clientWithAddressSchema } from "~/schemas/client";
import { transformerData } from "~/composables/client/transformeData";

import type { RowWithAddressSingle } from "~/interfaces/Client";

useHead({
  titleTemplate: `Novo cliente - %s`,
});

definePageMeta({
  path: "/cliente/criar",
});

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
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-5">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar"
        @click="router.back()"
      />
    </div>

    <v-sheet class="mx-2 pb-3" rounded="xl" elevation="5">
      <ClientForm title="NOVO CLIENTE" @submit="submit" />
    </v-sheet>
  </div>
</template>
