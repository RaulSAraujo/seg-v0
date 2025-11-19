<script setup lang="ts">
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

const props = defineProps<{
  requestId: string;
}>();

const emit = defineEmits(["new"]);

const tiptap = ref();

const files = ref<FileWithBase64[]>([]);

const { data: user } = useAuth();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const { convertToFile } = useFileOrBase64();

const comment = async () => {
  loading.value = true;

  const formData = new FormData();

  for (const img of files.value) {
    formData.append("files", convertToFile(img.base64));
  }

  formData.append("user_id", `${user.value!.id}`);
  formData.append("support_request_id", props.requestId);
  formData.append("comment", tiptap.value.editor.getHTML());

  try {
    const res = await $customFetch(`support-request-log`, {
      method: "POST",
      body: formData,
    });

    files.value = [];
    tiptap.value.editor.commands.clearContent();

    emit("new", res);

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};

const remove = (filename: string) => {
  files.value = files.value.filter((file) => file.name !== filename);
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

      <UiButtonFileToBase64 class="mr-2" @new-base64="files.push($event)" />

      <v-btn
        text="SALVAR"
        base-color="primary"
        :loading="loading"
        @click="comment"
      />
    </div>

    <div style="width: 60vw">
      <SupportRequestFilesNewGallery
        :files="files"
        :active-remove="true"
        @remove="remove"
      />
    </div>
  </v-timeline-item>
</template>
