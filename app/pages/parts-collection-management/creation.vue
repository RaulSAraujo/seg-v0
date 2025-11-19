<script setup lang="ts">
onBeforeMount(() => {
  partsCollectionStore.clearProps();
});

useHead({
  titleTemplate: `Nova gestão de coletas - %s`,
});

definePageMeta({
  path: "/gestao-coletas/criar",
});

const partsCollectionStore = usePartsCollectionStore();
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="VOLTAR PARA GERENCIAMENTO DE COLETA DE PEÇAS"
        :to="{
          name: 'parts-collection-management',
        }"
      />
    </div>

    <PartsCollectionManagementForm
      title="NOVA COLETA DE PEÇA"
      method-rest="POST"
    />

    <PartsCollectionManagementFloatingSaveButton method-rest="POST" />
  </div>
</template>
