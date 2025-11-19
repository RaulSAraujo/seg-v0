<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);
</script>

<template>
  <v-row dense>
    <v-col>
      <UiTextField
        v-model="form.return_invoice"
        label="Nota devolução"
        :disabled="form.status == 'PENDENTE' || form.status == 'EM ABERTO'"
      />
    </v-col>

    <v-col>
      <UiDatePicker
        v-model="form.collection_date_os"
        label="Data Coleta"
        :clearable="false"
        :multiple="false"
        disabled
      />
    </v-col>

    <v-col>
      <UiDatePicker
        v-model="form.warehouse_delivery_date"
        label="Data entrega galpão"
        :clearable="false"
        :multiple="false"
        @save="
          form.warehouse_delivery_date = $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>

    <v-col>
      <UiDatePicker
        v-model="form.requested_collection_date"
        label="Data Coleta Solicitada"
        :clearable="false"
        :multiple="false"
        @save="
          form.requested_collection_date = $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>

    <v-col>
      <UiDatePicker
        v-model="form.completion_deadline"
        label="Prazo de conclusão técnica"
        :clearable="false"
        :multiple="false"
        disabled
      />
    </v-col>

    <v-col>
      <UiDatePicker
        v-model="form.final_date"
        label="Data final"
        :clearable="false"
        :multiple="false"
        disabled
      />
    </v-col>
  </v-row>
</template>
