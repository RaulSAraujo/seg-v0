<script lang="ts" setup>
import { useGetPaymentTypes } from "~/composables/sac/useGetPaymentTypes";

const { data, status } = useGetPaymentTypes({ lazy: true });

const sacStore = useSacStore();
const { paymentType } = storeToRefs(sacStore);
</script>

<template>
  <div class="d-flex align-center">
    <span class="text-body-1 font-weight-medium text-primary mr-2">
      TIPO DE PAGAMENTO:
    </span>

    <div style="width: 200px">
      <UiSelect
        v-if="status == 'success' && data"
        v-model="paymentType"
        alt="payment-types-input"
        :items="data.values"
        rounded="lg"
      />
    </div>
  </div>
</template>
