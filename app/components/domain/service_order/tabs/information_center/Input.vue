<script lang="ts" setup>
import { useOSClientObservationsApi } from "~/services/service_order.service/useServiceOrderClientObsApi";

const { params } = useRoute();

const tiptap = ref();
const active = ref(false);
const loading = ref(false);

const { create } = useOSClientObservationsApi();

const comment = async () => {
  loading.value = true;

  try {
    await create(params.id as string, tiptap.value.editor.getHTML());

    tiptap.value.editor.commands.clearContent();

    active.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-bottom-sheet v-model="active">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Add"
        prepend-icon="mdi-plus"
        color="primary"
        variant="outlined"
        width="120"
      />
    </template>

    <v-card title="NOVO COMENTÁRIO ADMINISTRATIVO" rounded="t-xl" class="pa-5">
      <div class="divTipTap px-5 py-5 mb-6">
        <ClientOnly>
          <UiTiptap ref="tiptap" :editable="true" />
        </ClientOnly>
      </div>

      <v-btn
        text="SALVAR"
        base-color="primary"
        :loading="loading"
        class="mb-6"
        @click="comment"
      />
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}
</style>
