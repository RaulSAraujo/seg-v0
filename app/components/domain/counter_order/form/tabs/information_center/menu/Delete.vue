<script lang="ts" setup>
import { deleteInformationCenter } from "~/services/counter-order.service";

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const loading = useLoadingIndicator();

const comment = useState<Comment | null>("comment", () => null);

const snackbar = useState<boolean>("active-delete", () => false);
const currentTime = ref(0);

const infCenterStore = useCounterOrderInfCenterStore();

const destroy = async () => {
  try {
    snackbar.value = false;

    loading.start();

    const { message } = await deleteInformationCenter(comment.value!.id);

    $toast().success(message);

    infCenterStore.remove(comment.value!.id);
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
