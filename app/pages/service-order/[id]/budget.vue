<script lang="ts" setup>
const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - Orçamento - %s`,
});

definePageMeta({
  path: "/ordem-servico/:id/orcamento",
});
</script>

<template>
  <v-sheet min-height="500px">
    <ServiceOrderTabsBudgetProducts />

    <v-row justify="space-between" class="my-2">
      <v-col cols="7" class="pr-12">
        <ServiceOrderTabsBudgetServices />
      </v-col>

      <v-col cols="5" class="d-flex flex-column justify-center">
        <div>
          <ServiceOrderTabsBudgetStatus />

          <span class="text-caption text-grey">
            Ao modificar o valor, será salvo automaticamente "Apenas o valor do
            status".
          </span>
        </div>
      </v-col>

      <v-col cols="7" class="pr-12">
        <ServiceOrderTabsBudgetSolution />
      </v-col>

      <v-col cols="5">
        <ServiceOrderTabsBudgetFormsOfPayment />
      </v-col>
    </v-row>
  </v-sheet>
</template>
