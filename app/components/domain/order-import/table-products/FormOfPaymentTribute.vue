<script lang="ts" setup>
defineProps<{
  id: number;
  formOfPaymentTribute: string | null;
}>();

defineEmits(["updateText"]);

const payments = ref(["BOLETO", "PIX", "CCPJ", "CCPF"]);
</script>

<template>
  <UiEditDialogObject
    :id="id"
    attr="form_of_payment_tribute"
    :items="payments"
    :value="formOfPaymentTribute"
    url="import-orders/import-orders-products"
    @update-text="$emit('updateText', $event)"
  >
    <template #default="props">
      <span v-if="formOfPaymentTribute != null" v-bind="props">
        {{ formOfPaymentTribute }}
      </span>

      <v-btn v-else v-bind="props" variant="plain" block />
    </template>
  </UiEditDialogObject>
</template>
