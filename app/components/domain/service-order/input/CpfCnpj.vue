<script lang="ts" setup>
import type { Client } from "~/interfaces/Client";

defineProps<{
  readonly?: boolean;
}>();

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const addressStore = useServiceOrderAddressStore();
const { addressId, addressData } = storeToRefs(addressStore);

const { value: cpfCnpj, errorMessage: error } = useField<string | undefined>(
  "cpf_cnpj"
);

watch(
  () => clientData.value.cpf_cnpj,
  () => {
    cpfCnpj.value = clientData.value.cpf_cnpj;
  }
);

const { $customFetch } = useNuxtApp();

const { brDate } = useDateConversion();

const loading = ref(false);

const findCpfCnpj = async () => {
  loading.value = true;

  const res = await $customFetch<Client>("clients", {
    query: {
      cpf_cnpj: clientData.value.cpf_cnpj?.replace(/[^\w\s]|_/g, ""),
    },
  });

  if (res.rows.length == 0) {
    $toast().info("CPF/CNPJ não encontrados.");

    loading.value = false;
    return;
  }

  if (res.rows[0]) {
    Object.entries(res.rows[0]).forEach(([key, value]) => {
      if (key in clientData.value!) {
        if (value == "" || value == null) return;

        if (key == "born_date") {
          (clientData.value as unknown as Record<string, unknown>)[key] =
            brDate(value);

          return;
        }

        (clientData.value as unknown as Record<string, unknown>)[key] = value;
      }
    });
  }

  if (res.rows[0]?.ClientsAddresses[0]) {
    addressId.value = res.rows[0]?.ClientsAddresses[0].id || null;

    Object.entries(res.rows[0].ClientsAddresses[0]).forEach(([key, value]) => {
      if (key in addressData.value) {
        (addressData.value as unknown as Record<string, unknown>)[key] = value;
      }
    });
  } else {
    $toast().info("Cliente não possui dados de endereço.");
  }

  loading.value = false;
};
</script>

<template>
  <UiTextField
    v-model="clientData.cpf_cnpj"
    v-maska="!clientData.type ? '###.###.###-##' : '##.###.###/####-##'"
    label="Cpf/Cnpj"
    hide-details="auto"
    :placeholder="!clientData.type ? '___.___.___-__' : '__.___.___/____-__'"
    :disabled="clientData.type != false && clientData.type != true"
    :readonly="readonly"
    :error-messages="error"
    @keyup.enter="!readonly ? findCpfCnpj() : ''"
  >
    <template #append-inner>
      <v-btn
        variant="plain"
        icon="mdi-magnify"
        density="compact"
        :loading="loading"
        :readonly="readonly"
        @click="findCpfCnpj()"
      />
    </template>
  </UiTextField>
</template>
