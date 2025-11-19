<script setup lang="ts">
import type { Page } from "~/interfaces/Menu";
import type { Form } from "~/interfaces/SupportRequest";
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

useHead({
  titleTemplate: `Novo Chamado - %s`,
});

definePageMeta({
  path: "/chamados/criar",
});

interface TiptapInstance {
  focus: () => void;
  getHTML: () => string;
  setContent: (content: string) => void;
}

const tiptap = ref<TiptapInstance>();

const screen = ref<Page | null>(null);

const files = ref<FileWithBase64[]>([]);

const form = reactive<Form>({
  title: "",
  status: "EM ABERTO",
  priority: undefined,
  classification: undefined,
});

const remove = (filename: string) => {
  files.value = files.value.filter((file) => file.name !== filename);
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="`Voltar para chamados`"
        :to="{
          name: 'support-request',
        }"
      />
    </div>

    <v-sheet rounded="lg" class="pb-3">
      <v-toolbar title="NOVO CHAMADO" rounded="t-lg" />

      <v-row dense class="ma-2">
        <v-col>
          <SupportRequestInputScreen v-model="screen" />
        </v-col>

        <v-col>
          <SupportRequestInputClassification v-model="form.classification" />
        </v-col>

        <v-col>
          <SupportRequestInputPriority v-model="form.priority" />
        </v-col>
      </v-row>

      <v-text-field
        id="title-support-request"
        v-model="form.title"
        label="TÍTULO"
        variant="outlined"
        density="compact"
        color="primary"
        hide-details="auto"
        class="mx-3"
        maxlength="50"
        counter
      />

      <div class="divTipTap mx-3 mt-5 mb-2 px-3 py-5">
        <UiTiptap ref="tiptap" :editable="true" />

        <UiButtonFileToBase64 class="mr-2" @new-base64="files.push($event)" />

        <SupportRequestButtonCreate
          :form="form"
          :files="files"
          :screen="screen"
          :comment="tiptap?.getHTML() || ''"
        />
      </div>

      <div>
        <SupportRequestFilesNewGallery
          :files="files"
          :active-remove="true"
          @remove="remove"
        />
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
:deep(.divTipTap) {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}
</style>
