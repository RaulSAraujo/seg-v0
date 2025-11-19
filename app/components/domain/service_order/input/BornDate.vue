<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: bornDate, errorMessage: error } = useField<
  string | null | undefined
>("born_date");

watch(
  () => clientData.value.born_date,
  () => {
    bornDate.value = clientData.value.born_date;
  }
);
</script>

<template>
  <UiDatePicker
    v-model="clientData.born_date"
    label="Data nascimento"
    :multiple="false"
    :clearable="true"
    hide-details="auto"
    :error-messages="error"
    @save="clientData.born_date = $dayjs($event).format('DD/MM/YYYY')"
  />
</template>
