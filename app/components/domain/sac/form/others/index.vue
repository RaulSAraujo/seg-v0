<script lang="ts" setup>
const sacStore = useSacStore();
const { observation, ecomOrderId } = storeToRefs(sacStore);

const sacQuoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacQuoteFreightStore);
</script>

<template>
  <div>
    <div class="divTextArea px-5 py-2">
      <UiTextArea
        v-model="observation"
        label="Observação"
        variant="plain"
        :rows="5"
      />

      <span v-if="quoteFreight.name" class="text-caption text-grey">
        Frete: {{ quoteFreight.name }} | {{ quoteFreight.information }}
      </span>
    </div>

    <div class="mt-5" style="width: 250px">
      <UiTextField
        v-model="ecomOrderId"
        label="Id tray"
        rounded="lg"
        disabled
      />
    </div>
  </div>
</template>

<style scoped>
.divTextArea {
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
