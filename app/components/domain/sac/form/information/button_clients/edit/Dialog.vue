<script lang="ts" setup>
import { clientWithAddressSchema } from "~/schemas/client";
import { updateCustomerApi } from "~/services/sac.service";
import { createDefaultClient } from "~/factories/current/clientFactory";

import type { RowWithAddresses as Customer } from "~/interfaces/Customer";
import type { RowWithAddressSingle as Client } from "~/interfaces/Client";

const props = defineProps<{
  customer: Customer;
  client: Client;
}>();

const loading = ref(false);

const { handleSubmit } = useForm<Client>({
  validationSchema: clientWithAddressSchema,
  initialValues: createDefaultClient(props.client),
});

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true;

    await updateCustomerApi(values, props.customer);

    $toast().success("Sucesso ao atualizar o cliente.");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-dialog width="85vw" transition="dialog-top-transition">
    <v-sheet class="mx-2 pb-4" rounded="xl">
      <ClientForm title="EDITAR CLIENTE" @submit="submit" />
    </v-sheet>
  </v-dialog>
</template>
