<script lang="ts" setup>
import { updateInformationCenter } from "~/services/counter-order.service";

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const infCenterStore = useCounterOrderInfCenterStore();

const tiptap = ref();
const loading = ref(false);

const comment = useState<Comment | null>("comment", () => null);
const dialog = useState<boolean>("active-edit", () => false);

const update = async () => {
  try {
    if (!comment.value) return;

    loading.value = true;

    const res = await updateInformationCenter(
      comment.value?.id,
      tiptap.value.editor.getHTML()
    );

    infCenterStore.update(comment.value?.id, res);

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="dialog" width="80vw">
    <v-card title="ATUALIZAR COMENTÁRIO" rounded="xl">
      <template #text>
        <div class="divTipTap px-3 py-5 mb-2">
          <UiTiptap
            ref="tiptap"
            :editable="true"
            :content="comment?.description"
          />
        </div>
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          text="ATUALIZAR"
          width="10vw"
          class="bg-primary"
          @click="update"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
