<script setup lang="ts">
import { clientWithAddressSchema } from "~/schemas/client";
import { getById, update } from "~/services/client.service";
import { createDefaultClient } from "~/factories/current/clientFactory";
import { transformerData } from "~/composables/client/transformeData";

import type {
  RowWithAddressSingle,
  ClientAddress,
} from "~/interfaces/Client";

const { params } = useRoute();

useHead({
  titleTemplate: `Cliente #${params.id} - %s`,
});

definePageMeta({
  path: "/cliente/:id",
});

const res = await getById(params.id as string);

const router = useRouter();
const loading = useLoadingIndicator();

const { handleSubmit } = useForm<RowWithAddressSingle>({
  validationSchema: clientWithAddressSchema,
  initialValues: createDefaultClient(res),
});

const address2 = ref(res.deliveryAddress || ({} as ClientAddress));
const address3 = ref(res.collectionAddress || ({} as ClientAddress));

const submit = handleSubmit(async (values) => {
  try {
    loading.start();

    const newValues = transformerData(values);

    await update(
      params.id as string,
      newValues,
      address2.value,
      address3.value
    );

    $toast().success("Sucesso ao editar o cliente.");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
});

onBeforeRouteLeave((to, from, next) => {
  if (to.name == "client" || to.name == "client-id") {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="'Voltar'"
        @click="router.back()"
      />
    </div>

    <v-sheet class="mx-2 pb-4" rounded="xl">
      <ClientForm title="EDITAR CLIENTE" @submit="submit">
        <template #expansion>
          <v-expansion-panels elevation="0">
            <ClientUiExpansion :client-address="address2" />

            <ClientUiExpansion :client-address="address3" />
          </v-expansion-panels>
        </template>
      </ClientForm>
    </v-sheet>
  </div>
</template>
