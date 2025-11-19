<script lang="ts" setup>
defineProps<{
  step: number;
  disabled?: "prev" | "next" | boolean;
}>();

const serviceOrderStore = useServiceOrderStore();
const { status, service_mode, type, os_supplier } =
  storeToRefs(serviceOrderStore);

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const addressStore = useServiceOrderAddressStore();
const { addressId, addressData } = storeToRefs(addressStore);

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const invoiceStore = useServiceOrderInvoiceStore();
const { invoiceData } = storeToRefs(invoiceStore);

const { isDate, databaseDate } = useDateConversion();

const { capitalizeFirstLetter } = useCapitalize();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const save = async () => {
  loading.value = true;

  await saveClient();

  if (!loading.value) return;

  await saveOrder();

  loading.value = false;

  push({
    name: "service-order-id",
    params: { id: res.id },
  });
};

const erp_client_id = ref<number | null>(null);
const saveClient = async () => {
  const newCustomerData = {
    ...clientData.value,
    ClientsAddresses: [
      {
        ...addressData.value,
        type: "Faturamento",
        id: addressId.value != null ? addressId.value : undefined,
      },
    ],
  };

  if (isDate(newCustomerData.born_date!)) {
    newCustomerData.born_date = databaseDate(newCustomerData.born_date!);
  }

  newCustomerData.number1 = newCustomerData.number1.replace(/[^a-z0-9]/gi, "");
  newCustomerData.number2 = newCustomerData.number2?.replace(/[^a-z0-9]/gi, "");
  newCustomerData.number3 = newCustomerData.number3?.replace(/[^a-z0-9]/gi, "");

  newCustomerData.cpf_cnpj = newCustomerData.cpf_cnpj?.replace(
    /[^a-z0-9]/gi,
    ""
  );
  newCustomerData.identity_number = newCustomerData.identity_number?.replace(
    /[^a-z0-9]/gi,
    ""
  );

  type Response = {
    erp_id: number;
    erp_client_id: number;
    result: { erp_client_id: number }[];
  };

  try {
    const res = await $customFetch<Response>("clients", {
      method: newCustomerData.id ? "PUT" : "POST",
      body: {
        ...newCustomerData,
      },
    });

    erp_client_id.value =
      res.erp_id || res.erp_client_id || res.result[0]!.erp_client_id;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};

const { push } = useRouter();

const saveOrder = async () => {
  const newDeviceData = { ...apparatusData.value, ...invoiceData.value };

  if (isDate(newDeviceData.bought_at!)) {
    newDeviceData.bought_at = databaseDate(newDeviceData.bought_at!);
  }

  try {
    const res = await $customFetch<{ id: number }>("service-order", {
      method: "POST",
      body: {
        os_supplier: os_supplier.value,
        erp_client_id: erp_client_id.value,
        type: type.value,
        service_mode: service_mode.value,
        status: status.value,
        ...newDeviceData,
      },
    });

    $toast().success("Sucesso em criar a ordem de serviço");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    v-if="step == 3"
    text="CONCLUIR"
    variant="tonal"
    color="primary"
    :disabled="disabled == 'next'"
    :loading="loading"
    @click="save"
  />
</template>
