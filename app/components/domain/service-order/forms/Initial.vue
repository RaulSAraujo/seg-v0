<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const serviceOrderStore = useServiceOrderStore();
const { os_supplier } = storeToRefs(serviceOrderStore);

const othersStore = useServiceOrderOthersStore();
const { othersData } = storeToRefs(othersStore);
</script>

<template>
  <v-row dense class="mt-4">
    <v-col cols="3">
      <ServiceOrderInputErpType />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputServiceMode />
    </v-col>

    <v-col cols="3">
      <ServiceOrderInputErpSituation />
    </v-col>

    <v-col cols="2" class="pl-12">
      <ServiceOrderInputReentryStatus
        :reentry-status="othersData.reentry_status"
        @update="othersData.reentry_status = $event"
      />
    </v-col>

    <v-col cols="2">
      <UiDatePicker
        v-model="othersData.apparatus_entry_at"
        label="Data de entrada"
        :multiple="false"
        :clearable="true"
        @save="
          othersData.apparatus_entry_at = $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>

    <v-col cols="3">
      <UiTextField v-model="os_supplier" label="Os parceiro" />
    </v-col>

    <v-col cols="3">
      <UiTextField
        v-model="othersData.storage_location"
        label="Local de armazenagem"
      />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputTechnician />
    </v-col>

    <v-col cols="2" class="pl-12">
      <UiSwitch v-model="othersData.apparatus_collected" label="Aparelho ASC" />
    </v-col>

    <v-col cols="2">
      <UiDatePicker
        v-model="othersData.apparatus_delivery_at"
        label="Data de entrega"
        :multiple="false"
        :clearable="true"
        @save="
          othersData.apparatus_delivery_at = $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>
  </v-row>
</template>
