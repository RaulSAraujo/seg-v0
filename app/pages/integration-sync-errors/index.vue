<script setup lang="ts">
useHead({
  titleTemplate: `Erros de sincronização - %s`,
});

definePageMeta({
  path: "/erros-sincronizacao",
});

const dialog = ref(false);

const specificRef = ref<number | null>(null);

const openSpecificRef = (item: { produto_chave: number }) => {
  specificRef.value = item.produto_chave;

  dialog.value = true;
};

const close = (event: boolean) => {
  specificRef.value = null;

  dialog.value = event;
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">
      ERROS DE SINCRONIZAÇÃO
    </span>

    <UiFilter>
      <template #menu>
        <SyncErrorsMenuForceValidation @open-dialog="dialog = true" />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <SyncErrorsCheckErrors :id="item.id" />

        <SyncErrorsTemplateForceSync @open-dialog="openSpecificRef(item)" />
      </template>

      <template #item.divergence="{ item }">
        <SyncErrorsDivergence :divergence="item.divergence" />
      </template>
    </UiTable>

    <SyncErrorsMenuForceValidationDialog
      v-if="dialog"
      v-model="dialog"
      :specific-ref="specificRef"
      @close="close"
    />
  </div>
</template>
