<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

const emit = defineEmits(["remove"]);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loading = useLoadingIndicator();

const { capitalizeFirstLetter } = useCapitalize();

const { $customFetch } = useNuxtApp();

const destroy = async () => {
  snackbar.value = false;

  loading.start();

  try {
    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $customFetch<Response>("ip-access-list", {
      method: "DELETE",
      query: {
        id: props.id,
      },
    });

    if (!success) return $toast().error(message);

    $toast().success(message);

    emit("remove", props.id);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    base-color="pink"
    density="compact"
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
    <div class="text-subtitle-1">Deletar dados</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possivel recuperar, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
