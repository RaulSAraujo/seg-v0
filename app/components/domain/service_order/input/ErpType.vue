<script lang="ts" setup>
import { useErpTypeApi } from '../../composables/useErpTypeApi';

const { data, status } = useErpTypeApi({ lazy: true });

const serviceOrderStore = useServiceOrderStore();
const { type } = storeToRefs(serviceOrderStore);
</script>

<template>
  <UiSelect
    v-if="status === 'success' && data"
    v-model="type"
    label="Tipo de atendimento"
    :items="data"
    item-title="DESCRTIPOOS"
    item-value="TIPOOS"
  />
</template>
