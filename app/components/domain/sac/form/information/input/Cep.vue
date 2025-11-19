<script lang="ts" setup>
defineOptions({
  name: "SacCepInput",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.zip_code"
    v-maska="'#####-###'"
    label="Cep"
    append-inner-icon="mdi-map-marker-outline"
    hide-details="auto"
    :disabled="true"
  />
</template>
