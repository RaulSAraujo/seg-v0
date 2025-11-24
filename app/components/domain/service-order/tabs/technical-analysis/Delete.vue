<script lang="ts" setup>
import { useOSTechnicalObservationsApi } from "~/services/service_order.service/useServiceOrderTechnicalObsApi";

defineOptions({
  name: "ServiceOrderTabsTechnicalAnalysisDialogDelete",
});

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const loading = useLoadingIndicator();

const { remove } = useOSTechnicalObservationsApi();

const currentTime = ref(0);

const comment = useState<Comment | null>("comment", () => null);

const snackbar = useState<boolean>("open-delete-technical", () => false);

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
