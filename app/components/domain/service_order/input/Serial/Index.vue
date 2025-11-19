<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: serial, errorMessage: error } = useField<string | undefined>(
  "serial"
);

watch(
  () => apparatusData.value.serial_number,
  () => {
    serial.value = apparatusData.value.serial_number;
  }
);
</script>

<template>
  <UiTextField
    v-model="apparatusData.serial_number"
    label="Serial"
    :error-messages="error"
  >
    <template #append-inner>
      <ServiceOrderInputSerialHistory
        v-if="apparatusData.serial_number"
        :serial="apparatusData.serial_number"
      />
    </template>
  </UiTextField>
</template>
