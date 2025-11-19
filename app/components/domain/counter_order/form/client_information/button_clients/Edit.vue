<script lang="ts" setup>
defineOptions({
  name: "ClientInformation",
});

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <v-btn
    density="comfortable"
    icon="mdi-account-edit"
    base-color="primary"
    class="mr-2"
    :disabled="!customerData.id"
    :to="{
      name: 'client-id',
      params: { id: customerData.id },
    }"
  />
</template>
