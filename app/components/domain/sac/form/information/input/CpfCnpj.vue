<script lang="ts" setup>
import type { Customer, Row } from "~/interfaces/Customer";

const { params } = useRoute();
const { $customFetch } = useNuxtApp();

const sacStore = useSacStore();
const { seller } = storeToRefs(sacStore);

const sacCustomerStore = useSacCustomerStore();
const { customerData } = storeToRefs(sacCustomerStore);

const sacAddressStore = useSacAddressStore();

const loading = ref(false);

const cpfCnpj = ref("");

const findCpfCnpj = async () => {
  try {
    loading.value = true;

    const res = await $customFetch<Customer>("customer", {
      query: {
        cpf: cpfCnpj.value.replace(/[^a-z0-9]/gi, ""),
        seller: seller.value,
      },
    });

    if (res.rows.length == 0) {
      $toast().info("CPF/CNPJ não encontrados.");

      loading.value = false;
      return;
    }

    sacCustomerStore.set(res.rows[0] as Row);
    sacAddressStore.set(res.rows[0]?.CustomerAddresses ?? []);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    return $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UiTextField
    v-if="!params.id"
    v-model="cpfCnpj"
    v-maska="cpfCnpj.length <= 14 ? '###.###.###-###' : '##.###.###/####-##'"
    label="Cpf/Cnpj"
    hide-details="auto"
    :disabled="seller == undefined || params.id != undefined"
    @keyup.enter="findCpfCnpj()"
  >
    <template #append-inner>
      <v-btn
        icon="mdi-magnify"
        density="compact"
        :loading="loading"
        variant="plain"
        @click="findCpfCnpj()"
      />
    </template>
  </UiTextField>

  <UiTextField
    v-else
    v-maska="customerData.cpf ? '###.###.###-##' : '##.###.###/####-##'"
    :value="customerData.cpf || customerData.cnpj"
    label="Cpf/Cnpj"
    hide-details="auto"
    :disabled="true"
    @keyup.enter="findCpfCnpj()"
  >
    <template #append-inner>
      <v-btn
        icon="mdi-magnify"
        density="compact"
        :loading="loading"
        variant="plain"
        @click="findCpfCnpj()"
      />
    </template>
  </UiTextField>
</template>
