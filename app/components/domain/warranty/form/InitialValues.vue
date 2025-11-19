<script lang="ts" setup>
import { getWarrantyOrdersById } from "~/services/warranty.service";
import { initialWarrantyTransformData } from "../../utils/transformeData";

import type { RowWithRelationship } from "~/interfaces/Warranty";

const props = defineProps<{
  orders: RowWithRelationship;
  disabled?: boolean;
}>();

const emit = defineEmits(["updateOrders"]);

const { $dayjs } = useNuxtApp();

const loading = useLoadingIndicator();

const idWarranty = ref("");
const ordersComput = computed(() => props.orders);

const getSaleWarranty = async () => {
  try {
    loading.start();

    const res = await getWarrantyOrdersById(idWarranty.value);

    const transformed = initialWarrantyTransformData(res);

    emit("updateOrders", transformed);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

defineExpose({ idWarranty });
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiTextField
        v-model="idWarranty"
        label="Id tray"
        :disabled="disabled || false"
        append-inner-icon="mdi-send"
        @keyup.enter="getSaleWarranty"
        @click:append-inner="getSaleWarranty"
        @keypress:append-inner="getSaleWarranty"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="ordersComput.indicacao"
        label="Indicação"
        :disabled="true"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="ordersComput.n_marketplace"
        label="Marketplace"
        :disabled="true"
      />
    </v-col>

    <v-col cols="3">
      <UiTextField
        v-model="ordersComput.cliente"
        label="Cliente"
        :disabled="true"
      />
    </v-col>

    <v-col cols="3">
      <UiTextField
        v-model="ordersComput.cpf_cnpj"
        label="Cpf/Cnpj"
        :disabled="true"
      />
    </v-col>

    <v-col cols="3">
      <UiTextField
        v-model="ordersComput.usuario"
        label="Usuário"
        :disabled="true"
      />
    </v-col>

    <v-col cols="2">
      <ClientOnly>
        <UiDatePicker
          v-model="ordersComput.dtabertura"
          label="Data abertura"
          :multiple="false"
          :clearable="true"
          :disabled="true"
          @save="ordersComput.dtabertura = $dayjs($event).format('DD/MM/YYYY')"
        />
      </ClientOnly>
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="ordersComput.notafiscal_venda"
        label="Nota fiscal"
        :disabled="true"
      />
    </v-col>

    <v-col cols="2">
      <UiDatePicker
        v-model="ordersComput.dtnotafiscal_venda"
        label="Emissão nota fiscal"
        :multiple="false"
        :clearable="true"
        :disabled="true"
        @save="
          ordersComput.dtnotafiscal_venda = $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>

    <v-col cols="3">
      <UiTextField
        v-model="ordersComput.internal_cnpj"
        label="Cnpj emitente"
        :disabled="true"
      />
    </v-col>
  </v-row>
</template>
