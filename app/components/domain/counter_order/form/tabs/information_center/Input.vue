<script lang="ts" setup>
import { creationInformationCenter } from "~/services/counter-order.service";

defineOptions({
  name: "CounterOrderInformationCenterInput",
});

const { params } = useRoute();

const tiptap = ref();
const loading = ref(false);

const infCenterStore = useCounterOrderInfCenterStore();

const comment = async () => {
  try {
    loading.value = true;

    const res = await creationInformationCenter(
      params.id as string,
      tiptap.value.editor.getHTML()
    );

    tiptap.value.editor.commands.clearContent();

    infCenterStore.add(res);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-timeline-item
    dot-color="primary"
    size="x-large"
    fill-dot
    width="90vw"
    icon="mdi-comment"
  >
    <div class="divTipTap px-3 py-5 mb-2">
      <UiTiptap ref="tiptap" :editable="true" />

      <v-btn
        text="SALVAR"
        base-color="primary"
        :loading="loading"
        @click="comment"
      />
    </div>
  </v-timeline-item>
</template>

<style scoped>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}
</style>
