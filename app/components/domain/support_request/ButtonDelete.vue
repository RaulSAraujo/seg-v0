<script lang="ts" setup>
const props = defineProps<{
  idSupport: number;
  userId: number | string;
  createdAt: string | Date;
}>();

const emit = defineEmits(["destroy"]);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const { data } = useAuth();

const dayjs = useDayjs();

const disabled = computed(() => {
  if (data.value?.groupId == 1) return false;

  if (props.userId == data.value?.id && dayjs().diff(props.createdAt, "minutes") <= 10) {
    return false;
  }

  return true;
});

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const destroy = async () => {
  snackbar.value = false;

  loading.start();

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $customFetch<Response>("support-request-log", {
      method: "DELETE",
      query: {
        id: props.idSupport,
      },
    });

    if (!success) return $toast().error(message);

    $toast().success(message);

    loading.finish();

    emit("destroy", props.idSupport);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    density="comfortable"
    variant="plain"
    color="pink"
    :disabled="disabled"
    @click="snackbar = true"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deletar comentario</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possivel recuperar, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
