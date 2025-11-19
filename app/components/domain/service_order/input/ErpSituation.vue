<script lang="ts" setup>
import { useErpSituationApi } from "../../composables/useErpSituationApi";

const serviceOrderStore = useServiceOrderStore();
const { status } = storeToRefs(serviceOrderStore);

const { data, status: statusApi } = useErpSituationApi({ lazy: true });
</script>

<template>
  <UiAutoComplete
    v-if="statusApi == 'success'"
    v-model="status"
    label="Situação"
    :items="data ?? []"
    item-title="DESCRSITUACAOOS"
    item-value="SITUACAOOS"
  />
</template>
