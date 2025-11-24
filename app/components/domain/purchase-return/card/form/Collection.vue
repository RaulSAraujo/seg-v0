<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const purchaseReturnStore = usePurchaseReturnStore();
const { form } = storeToRefs(purchaseReturnStore);
</script>

<template>
  <div class="my-5">
    <div class="mb-2">
      <span class="text-h6">DADOS DA COLETA</span>
    </div>

    <v-row dense>
      <v-col cols="12" md="4" lg="2">
        <UiDatePicker
          v-model="form.packing_date"
          label="Data embalagem"
          :clearable="true"
          :multiple="false"
          @save="form.packing_date = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <UiDatePicker
          v-model="form.collection_date_limit"
          label="Data limite coleta"
          :clearable="true"
          :multiple="false"
          @save="
            form.collection_date_limit = $dayjs($event).format('DD/MM/YYYY')
          "
        />
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <UiDatePicker
          v-model="form.collection_date"
          label="Data coleta"
          :clearable="true"
          :multiple="false"
          @save="form.collection_date = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>
    </v-row>
  </div>
</template>
