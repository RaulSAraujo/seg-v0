<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { os_supplier } = storeToRefs(serviceOrderStore);
</script>

<template>
  <v-card
    title="INFORMAÇÕES GERAIS"
    subtitle="Informações gerais da ordem de serviço."
    color="transparent"
    flat
  >
    <v-row dense>
      <v-col>
        <ServiceOrderInputServiceMode />
      </v-col>
      <v-col>
        <ServiceOrderInputErpType />
      </v-col>
      <v-col>
        <ServiceOrderInputErpSituation />
      </v-col>
      <v-col>
        <UiTextField v-model="os_supplier" label="Os parceiro" />
      </v-col>
    </v-row>
  </v-card>
</template>
