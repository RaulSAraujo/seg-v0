<script lang="ts" setup>
// ===== IMPORTS E TIPOS =====
import { useErpServicesApi } from "~/composables/service_order/useErpServicesApi";
import { useOSServicesApi } from "~/services/service_order.service/useServiceOrderServicesApi";

import type { ServiceOrderServiceForm } from "~/interfaces/ServiceOrder";

defineOptions({
  name: "ServiceOrderTabsBudgetServicesCreation",
});

// ===== COMPOSABLES =====
const { params } = useRoute();

// ===== APIS =====
const { create } = useOSServicesApi();
const { data } = useErpServicesApi({
  lazy: true,
});

// ===== ESTADO REATIVO =====
const form = reactive<ServiceOrderServiceForm>({
  service: null,
  quantity: 1,
  service_value: "",
});

// ===== FUNÇÕES UTILITÁRIAS =====
const close = () => {
  form.service = null;
  form.quantity = 1;
  form.service_value = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="300px"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        color="primary"
        text="Adicionar serviço"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="NOVO SERVIÇO" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiAutoComplete
                v-model="form.service"
                label="Situação"
                :items="data ?? []"
                item-title="DESCRSERV"
                item-value="SERVICO"
                return-object
              />
            </v-col>
            <v-col cols="12">
              <UiNumberInput v-model="form.quantity" label="Quantidade" />
            </v-col>
            <v-col cols="12">
              <UiCurrencyField
                v-model="form.service_value"
                label="Valor do serviço"
              />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="
              create(params.id as string, form);

              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
