<script lang="ts" setup>
const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - Central de Informações - %s`,
});

definePageMeta({
  path: "/ordem-servico/:id/central-de-informacoes",
});
</script>

<template>
  <div class="my-5 mx-2">
    <V-row>
      <v-col cols="12" md="6">
        <ServiceOrderTabsTechnicalAnalysis />
      </v-col>

      <v-col cols="12" md="6">
        <ServiceOrderTabsInformationCenter />
      </v-col>
    </V-row>
  </div>
</template>
