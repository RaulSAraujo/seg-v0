<script lang="ts" setup>
import { useErpSituationApi } from "~/composables/service_order/useErpSituationApi";

const { data, status } = useErpSituationApi({ lazy: true });
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Situação"
    :items="data ?? []"
    item-title="DESCRSITUACAOOS"
    item-value="SITUACAOOS"
    :multiple="true"
    :clearable="true"
  />
</template>
