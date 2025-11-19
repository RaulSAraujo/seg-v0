<script lang="ts" setup>
defineOptions({
  name: "ClientInputBornDate",
});

const { $dayjs } = useNuxtApp();

const { value: bornDate, errorMessage: error } = useField<
  string | null | undefined
>("born_date");
</script>

<template>
  <UiDatePicker
    v-model="bornDate"
    label="Data nascimento"
    :multiple="false"
    :clearable="true"
    hide-details="auto"
    :error-messages="error"
    @save="bornDate = $dayjs($event).format('DD/MM/YYYY')"
  />
</template>
