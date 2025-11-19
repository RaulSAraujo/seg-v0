<script lang="ts" setup>
import Dialog from "./Dialog.vue";
import { findCustomerApi } from "~/services/sac.service";

import type { RowWithAddresses as Customer } from "~/interfaces/Customer";
import type { RowWithAddressSingle as Client } from "~/interfaces/Client";

const sacStore = useSacStore();
const { seller } = storeToRefs(sacStore);

const sacCustomerStore = useSacCustomerStore();
const { customerData } = storeToRefs(sacCustomerStore);

const dialog = ref(false);
const loading = ref(false);
const client = ref<Client>({} as Client);
const customer = ref<Customer>({} as Customer);

const getCustomer = async () => {
  try {
    loading.value = true;

    const res = await findCustomerApi();

    if (!res) return;

    client.value = res.client;
    customer.value = res.customer;

    dialog.value = true;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    class="mr-2"
    density="comfortable"
    icon="mdi-account-edit"
    base-color="primary"
    :loading="loading"
    :disabled="seller == undefined || customerData.id == 0"
    @click="getCustomer"
  />

  <Dialog
    v-if="dialog"
    v-model="dialog"
    :client="client"
    :customer="customer"
  />
</template>
