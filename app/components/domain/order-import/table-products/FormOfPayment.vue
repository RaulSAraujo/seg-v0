<script lang="ts" setup>
defineProps<{
  id: number;
  formOfPayment: string;
}>();

defineEmits(["updateText"]);

const payments = ref(["BOLETO", "PIX", "CCPJ", "CCPF"]);
</script>

<template>
  <UiEditDialogObject
    :id="id"
    attr="form_of_payment"
    :items="payments"
    :value="formOfPayment"
    url="import-orders/import-orders-products"
    @update-text="$emit('updateText', $event)"
  >
    <template #default="props">
      <span v-bind="props">{{ formOfPayment }}</span>
    </template>
  </UiEditDialogObject>
</template>
