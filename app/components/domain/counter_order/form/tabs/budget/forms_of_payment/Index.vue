<script lang="ts" setup>
import Table from "./table/Index.vue";
import Creation from "./creation/Index.vue";

defineOptions({
  name: "CounterOrderTabsBudgetFormsOfPayment",
})
</script>

<template>
  <div>
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">FORMA DE PAGAMENTO</p>

      <Creation />
    </div>

    <Table />
  </div>
</template>
