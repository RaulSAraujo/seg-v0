<script lang="ts" setup>
const list = ref([
  { text: "PENDENTE" },
  { text: "APROVADO" },
  { text: "REPROVADO" },
  { text: "RMA" },
  { text: "LAUDO" },
]);

const serviceOrderStore = useServiceOrderStore();
const { budgetStatus, status } = storeToRefs(serviceOrderStore);

const { params } = useRoute();

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

watch(
  () => budgetStatus.value,
  async (value) => {
    loading.start();

    try {
      await $customFetch("service-order", {
        method: "PUT",
        body: {
          id: params.id,
          status: status.value,
          budget_status: value,
        },
      });

      loading.finish();
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${err.data.error ?? err.statusText}`);

      loading.finish();
    }
  }
);
</script>

<template>
  <div class="d-flex align-center">
    <p class="text-h6 font-weight-medium text-primary mr-2">STATUS DO ORÇAMENTO:</p>

    <div style="width: 300px">
      <UiSelect
        v-model="budgetStatus"
        label="Status do orçamento"
        :items="list"
        item-title="text"
        item-value="text"
      />
    </div>
  </div>
</template>
