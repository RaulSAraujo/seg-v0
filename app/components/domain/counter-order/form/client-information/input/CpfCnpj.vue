<script lang="ts" setup>
import type { Client } from "~/interfaces/Client";

const { params } = useRoute();

const { $customFetch } = useNuxtApp();

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);

const loading = ref(false);

const findCpfCnpj = async () => {
  try {
    loading.value = true;

    const res = await $customFetch<Client>("clients", {
      query: {
        cpf_cnpj: customerData.value.cpf_cnpj.replace(/[^a-z0-9]/gi, ""),
      },
    });

    if (res.rows.length == 0) {
      $toast().info("CPF/CNPJ não encontrados.");

      loading.value = false;
      return;
    }

    if (res.rows[0]) {
      Object.entries(res.rows[0]).forEach(([key, value]) => {
        if (key in customerData.value!) {
          if (value == "" || value == null) return;

          (customerData.value as unknown as Record<string, unknown>)[key] =
            value;
        }
      });
    }

    if (res.rows[0]?.ClientsAddresses.length == 0) {
      $toast().info("Cliente não possui dados de endereço.");

      loading.value = false;
      return;
    }

    if (res.rows[0]?.ClientsAddresses[0]) {
      Object.entries(res.rows[0].ClientsAddresses[0]).forEach(
        ([key, value]) => {
          if (key in addressData.value) {
            (addressData.value as unknown as Record<string, unknown>)[key] =
              value;
          }
        }
      );
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UiTextField
    v-model="customerData.cpf_cnpj"
    label="Cpf/Cnpj"
    hide-details="auto"
    :disabled="!!params.id"
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
