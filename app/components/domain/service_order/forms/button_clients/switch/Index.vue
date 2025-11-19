<script lang="ts" setup>
import type { Client, RowWithAddress } from "~/interfaces/Client";

import Find from "./Find.vue";
import Table from "./Table.vue";

const { params } = useRoute();

const find = ref();

const items = ref<RowWithAddress[]>([]);

const { $customFetch } = useNuxtApp();

const loading = ref(false);

interface Form {
  cpf_cnpj: string | undefined;
  name: string | undefined;
  identity_number: string | undefined;
}

const search = async (event: Form) => {
  try {
    loading.value = true;

    const valid = Object.values(event).some(
      (e) => typeof e == "string" && e.length > 0
    );

    if (!valid) return;

    const { rows } = await $customFetch<Client>("clients", {
      params: event,
    });

    items.value = rows;

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};

const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const newClient = async (client: RowWithAddress) => {
  try {
    await $customFetch("service-order", {
      method: "PUT",
      body: {
        id: params.id,
        erp_client_id: client.erp_client_id,
      },
    });

    Object.entries(client).forEach(([key, value]) => {
      if (key in clientData.value) {
        (clientData.value as unknown as Record<string, unknown>)[key] = value;
      }
    });

    if (!client.ClientsAddresses[0]) return;

    Object.entries(client.ClientsAddresses[0]).forEach(([key, value]) => {
      if (key in addressData.value) {
        (addressData.value as unknown as Record<string, unknown>)[key] = value;
      }
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="75VW"
    @after-leave="find.clear()"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        density="comfortable"
        icon="mdi-account-switch"
        base-color="primary"
        class="mr-2"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="ALTERAR USUÁRIO" rounded="xl">
        <template #text>
          <Find ref="find" @search="search" />

          <Table
            :items="items"
            :loading="loading"
            @add="
              isActive.value = false;

              newClient($event);
            "
          />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
