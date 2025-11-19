<script lang="ts" setup>
import type { ClientAddress } from "~/interfaces/Client";

defineOptions({
  name: "ClientAddressExpansion",
});

const props = defineProps<{
  clientAddress: ClientAddress;
}>();

const address = computed(() => props.clientAddress);
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      ENDEREÇO DE {{ address.type?.toUpperCase() }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <v-row dense class="mt-2">
        <v-col cols="3">
          <ClientUiViaCep
            v-model="address.zipcode"
            :value="address.zipcode"
            :alt="`${address.type}-zipcode`"
            @update="
              (data) => {
                address.street = data.logradouro.toUpperCase();
                address.neighbourhood = data.bairro.toUpperCase();
                address.city = data.localidade.toUpperCase();
                address.state = data.uf.toUpperCase();
                address.complement = data.complemento.toUpperCase();
              }
            "
          />
        </v-col>

        <v-col cols="3">
          <UiTextField
            v-model="address.city"
            label="Cidade"
            :alt="`${address.type}-city`"
            append-inner-icon="mdi-city"
            hide-details="auto"
          />
        </v-col>

        <v-col cols="2">
          <UiTextField
            v-model="address.state"
            v-maska="'AA'"
            label="Uf"
            :alt="`${address.type}-state`"
            hide-details="auto"
          />
        </v-col>

        <v-col cols="4">
          <UiTextField
            v-model="address.neighbourhood"
            label="Bairro"
            :alt="`${address.type}-neighborhood`"
            hide-details="auto"
          />
        </v-col>

        <v-col cols="9">
          <UiTextField
            v-model="address.street"
            label="Rua"
            :alt="`${address.type}-street`"
            append-inner-icon="mdi-road"
            hide-details="auto"
          />
        </v-col>

        <v-col cols="3">
          <UiTextField
            v-model="address.number"
            label="Número"
            :alt="`${address.type}-number`"
            append-inner-icon="mdi-numeric"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="address.complement"
            label="Complemento"
            :alt="`${address.type}-complement`"
            :hide-details="true"
          />
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
