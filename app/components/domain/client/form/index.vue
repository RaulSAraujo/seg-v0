<script lang="ts" setup>
import { update, creation } from "~/services/client.service";
import { clientWithAddressSchema } from "~/schemas/client";
import { createDefaultClient } from "~/factories/clientFactory";
import { clientMapper } from "~/composables/client/clientMapper";

import type {
  Row,
  ClientAddress,
  RowWithAddress,
  RowWithAddressSingle,
} from "~/interfaces/Client";

defineOptions({
  name: "ClientForm",
});

const props = defineProps<{
  title: string;
  clientId?: string;
  initialValues?: RowWithAddress;
}>();

const emit = defineEmits<{
  submit: [values: RowWithAddressSingle];
}>();

const router = useRouter();

// Determina se é modo de criação ou edição
const isEditMode = computed(() => !!props.clientId && !!props.initialValues);

// Para modo de edição, transforma os dados iniciais
const { transformDateBr } = useDateConversion();

const transformed = computed(() => {
  if (props.initialValues) {
    return transformDateBr(props.initialValues);
  }
  return null;
});

const deliveryAddress = computed(() => 
  transformed.value?.ClientsAddresses.find((e) => e.type == "Entrada")
);

const billingAddress = computed(() => 
  transformed.value?.ClientsAddresses.find((e) => e.type == "Faturamento")
);

const collectionAddress = computed(() => 
  transformed.value?.ClientsAddresses.find((e) => e.type == "Cobrança")
);

// Inicializa o formulário com valores padrão ou valores iniciais
const initialFormValues = computed(() => {
  if (isEditMode.value && transformed.value) {
    return createDefaultClient({
      ...(transformed.value as Row),
      ClientsAddresses: (billingAddress.value || {}) as ClientAddress,
    });
  }
  // Para criação, usa valores padrão com endereço de faturamento
  const defaultClient = createDefaultClient();
  return {
    ...defaultClient,
    ClientsAddresses: {
      ...defaultClient.ClientsAddresses,
      type: "Faturamento",
      country: "BRASIL",
    },
  };
});

const { handleSubmit } = useForm<RowWithAddressSingle>({
  validationSchema: clientWithAddressSchema,
  initialValues: initialFormValues.value,
});

const loading = ref(false);
const address2 = ref<ClientAddress>({} as ClientAddress);
const address3 = ref<ClientAddress>({} as ClientAddress);

// Atualiza os endereços quando os dados iniciais mudarem (modo edição)
watch([deliveryAddress, collectionAddress], ([delivery, collection]) => {
  if (delivery) {
    address2.value = { ...delivery } as ClientAddress;
  }
  if (collection) {
    address3.value = { ...collection } as ClientAddress;
  }
}, { immediate: true });

const { value: flagClient } = useField("flag_client");

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true;

    const newValues = clientMapper(values);

    if (isEditMode.value && props.clientId) {
      // Modo de edição
      await update(props.clientId, newValues, address2.value, address3.value);
      $toast().success("Sucesso ao editar o cliente.");
    } else {
      // Modo de criação
      await creation(newValues);
      $toast().success("Sucesso ao cadastrar novo cliente.");
      
      // Emite evento para permitir que a página pai controle a navegação
      emit("submit", values);
      
      // Navega de volta após sucesso
      router.back();
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };
    $toast().error(`${err.data?.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-toolbar :title="title" rounded="t-xl" class="pr-3">
      <ClientUiFlags v-model="flagClient" />
    </v-toolbar>

    <v-row class="ma-5" dense justify="space-between">
      <v-col cols="9">
        <ClientFormInputName />
      </v-col>

      <v-col cols="3">
        <ClientFormInputGender />
      </v-col>

      <v-col cols="2">
        <ClientFormInputType />
      </v-col>

      <v-col cols="4">
        <ClientFormInputCpfCnpj />
      </v-col>

      <v-col cols="4">
        <ClientFormInputIdentityNumber />
      </v-col>

      <v-col cols="2">
        <ClientFormInputBornDate />
      </v-col>

      <v-col cols="3">
        <ClientFormInputEmail />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber1 />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber2 />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber3 />
      </v-col>

      <v-col cols="12">
        <ClientFormInputObservation />
      </v-col>
    </v-row>

    <v-toolbar title="DADOS DO ENDEREÇO" />

    <v-row class="ma-5" dense>
      <v-col cols="3">
        <ClientFormInputViaCep />
      </v-col>

      <v-col cols="3">
        <ClientFormInputCity />
      </v-col>

      <v-col cols="2">
        <ClientFormInputState />
      </v-col>

      <v-col cols="4">
        <ClientFormInputNeighborhood />
      </v-col>

      <v-col cols="9">
        <ClientFormInputStreet />
      </v-col>

      <v-col cols="3">
        <ClientFormInputNumber />
      </v-col>

      <v-col cols="12">
        <ClientFormInputComplement />
      </v-col>
    </v-row>

    <v-expansion-panels v-if="isEditMode" elevation="0">
      <ClientUiExpansion :client-address="address2" />

      <ClientUiExpansion :client-address="address3" />
    </v-expansion-panels>

    <v-btn
      class="button mr-4 mb-4"
      icon="mdi-content-save"
      color="primary"
      type="submit"
      position="fixed"
      :loading="loading"
      location="bottom end"
    />
  </v-form>
</template>

<style scoped>
.button {
  opacity: 0.2;
  z-index: 99;
}

.button:hover {
  opacity: 0.8;
}
</style>
