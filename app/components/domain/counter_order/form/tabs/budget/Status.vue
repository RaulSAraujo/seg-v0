<script lang="ts" setup>
defineOptions({
  name: "CounterOrderTabsBudgetStatus",
});

const status = ref(["APROVADO", "REPROVADO", "PENDENTE"]);

const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);
</script>

<template>
  <div class="d-flex align-center ml-16" style="height: 150px">
    <p class="text-h6 font-weight-medium text-primary mr-2">
      STATUS DO ORÇAMENTO:
    </p>

    <div style="width: 300px">
      <UiSelect
        v-model="form.budget_status"
        label="Status do orçamento"
        :items="status"
      />
    </div>
  </div>
</template>
