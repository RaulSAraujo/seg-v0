<script lang="ts" setup>
onBeforeMount(() => {
  serviceOrderStore.clear();
});

useHead({
  titleTemplate: `Nova ordem de serviço - %s`,
});

definePageMeta({
  path: "/ordem-servico/criar",
});

const serviceOrderStore = useServiceOrderStore();
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para orderm de serviço"
        :to="{
          name: 'service-order',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar title="NOVA ORDEM DE SERVIÇO" rounded="t-xl" class="mb-5" />

      <ServiceOrderStepper />
    </v-sheet>
  </div>
</template>
