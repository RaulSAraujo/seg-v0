<script lang="ts" setup>
import { useOSClientObservationsApi } from "~/services/service_order.service/useServiceOrderClientObsApi";

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const currentTime = ref(0);
const snackbar = useState<boolean>("open-delete-information", () => false);

const comment = useState<Comment | null>("comment", () => null);

const { remove } = useOSClientObservationsApi();

const loading = useLoadingIndicator();

const destroy = async () => {
  snackbar.value = false;

  try {
    loading.start();

    await remove(comment.value!.id);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
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
    <div class="text-subtitle-1">Deletar comentário</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possível recuperar, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
