<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientId } = storeToRefs(clientStore);
</script>

<template>
  <v-btn
    density="comfortable"
    icon="mdi-account-edit"
    base-color="primary"
    class="mr-2"
    :to="{
      name: 'client-id',
      params: { id: clientId },
    }"
  />
</template>
