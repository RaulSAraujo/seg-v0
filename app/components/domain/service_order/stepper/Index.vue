<script lang="ts" setup>
import Header from "./Header/index.vue";
import Window from "./Window/index.vue";
import Actions from "./Actions.vue";

const serviceOrderStore = useServiceOrderStore();
const { service_mode, type, status } = storeToRefs(serviceOrderStore);

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const validateStepOne = computed(
  () => service_mode.value !== null && type.value !== null && status.value !== null
);

const validateStepTwo = computed(() => {
  const newData = { ...clientData.value, ...addressData.value };

  delete newData.cpf_cnpj;
  delete newData.identity_number;
  delete newData.born_date;
  delete newData.email;
  delete newData.identifier_number1;
  delete newData.number2;
  delete newData.identifier_number2;
  delete newData.number3;
  delete newData.identifier_number3;
  delete newData.complement;
  delete newData.observation;
  delete newData.maps_location;
  delete newData.country;
  delete newData.flag_client;

  return Object.values(newData).every((e) => {
    return e !== null && e !== "";
  });
});

const validateStepThree = computed(() => {
  const newData = { ...apparatusData.value };

  delete newData.serial_number;
  delete newData.version;
  delete newData.accessories;
  delete newData.additional_observation;

  return Object.values(newData).every((e) => {
    return e !== null && e !== "";
  });
});

const step = ref(1);
</script>

<template>
  <v-stepper v-model="step">
    <template #default="{ prev, next }">
      <Header
        :step="step"
        :validate-one="validateStepOne"
        :validate-two="validateStepTwo"
        :validate-three="validateStepThree"
      />

      <Window />

      <Actions
        :step="step"
        :validate-one="validateStepOne"
        :validate-two="validateStepTwo"
        :validate-three="validateStepThree"
        @on-prev="prev"
        @on-next="next"
      />
    </template>
  </v-stepper>
</template>
