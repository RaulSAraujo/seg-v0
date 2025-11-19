<script lang="ts" setup>
const props = defineProps<{
  idSupport: number;
  userId: number | string;
  createdAt: string | Date;
  comment: string;
}>();

const emit = defineEmits(["update-comment"]);

const { data } = useAuth();

const dayjs = useDayjs();

const disabled = computed(() => {
  if (data.value?.groupId == 1) return false;

  if (props.userId == data.value?.id && dayjs().diff(props.createdAt, "minutes") <= 10) {
    return false;
  }

  return true;
});

const tiptap = ref();

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const update = async () => {
  loading.start();

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $customFetch<Response>("support-request-log", {
      method: "PUT",
      body: {
        id: props.idSupport,
        comment: tiptap.value.editor.getHTML(),
      },
    });

    if (!success) return $toast().error(message);

    $toast().success(message);

    loading.finish();

    emit("update-comment");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-dialog width="80vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        icon="mdi-pencil"
        density="comfortable"
        variant="plain"
        color="primary"
        :disabled="disabled"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="ATUALIZAR COMENTARIO" rounded="xl">
        <template #text>
          <div class="divTipTap px-3 py-5 mb-2">
            <UiTiptap ref="tiptap" :editable="true" :content="comment" />
          </div>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            text="ATUALIZAR"
            width="10vw"
            class="bg-primary"
            @click="
              update();

              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
