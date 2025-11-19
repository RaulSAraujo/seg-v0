<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const sacStore = useSacStore();
const { saleDate } = storeToRefs(sacStore);
</script>

<template>
  <UiDatePicker
    v-model="saleDate"
    label="Data cotação"
    :multiple="false"
    :clearable="true"
    hide-details="auto"
    @save="saleDate = $dayjs($event).format('DD/MM/YYYY')"
  />
</template>
