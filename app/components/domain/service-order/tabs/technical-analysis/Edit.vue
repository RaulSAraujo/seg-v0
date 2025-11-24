<script lang="ts" setup>
import { useOSTechnicalObservationsApi } from "~/services/service_order.service/useServiceOrderTechnicalObsApi";

// ===== INTERFACES =====
interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

// ===== COMPOSABLES E ESTADO =====
const loading = useLoadingIndicator();
const comment = useState<Comment | null>("comment", () => null);
const active = useState<boolean>("open-edit-technical", () => false);

// ===== REFS =====
const tiptap = ref();

// ===== APIS =====
const { update } = useOSTechnicalObservationsApi();

// ===== COMPUTED PROPERTIES =====
const isCommentValid = computed(() => {
  return comment.value && comment.value.id && comment.value.description;
});

const canUpdate = computed(() => {
  return isCommentValid.value && tiptap.value?.editor;
});

// ===== MÉTODOS =====
const handleUpdate = async (): Promise<void> => {
  if (!canUpdate.value) {
    console.warn("Não é possível atualizar: dados inválidos");
    return;
  }

  try {
    loading.start();

    const htmlContent = tiptap.value.editor.getHTML();

    await update(comment.value!.id, htmlContent);

    active.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

// ===== WATCHERS =====
watch(active, (newValue) => {
  // Reset do editor quando o active é fechado
  if (!newValue && tiptap.value?.editor) {
    tiptap.value.editor.commands.setContent(comment.value?.description || "");
  }
});
</script>

<template>
  <v-bottom-sheet v-model="active">
    <v-card
      class="pa-5"
      elevation="0"
      rounded="t-xl"
      title="ATUALIZAR COMENTÁRIO TÉCNICO"
    >
      <template #prepend>
        <v-icon color="primary">mdi-comment-edit</v-icon>
      </template>

      <div class="divTipTap px-5 py-5 mb-6">
        <UiTiptap
          ref="tiptap"
          :editable="true"
          :content="comment?.description || ''"
          class="tiptap-editor"
        />
      </div>

      <v-btn
        class="mb-6"
        rounded="lg"
        color="primary"
        :disabled="!canUpdate"
        :loading="loading.isLoading.value"
        @click="handleUpdate"
      >
        Atualizar
      </v-btn>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}
</style>
