<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  disabled?: boolean;
  urlLocal?: string | null;
  spliceExternal?: boolean;
  functionExternal?: boolean;
}>();

const emit = defineEmits(["remove"]);

const loading = useLoadingIndicator();

const tableStore = useTableStore();
const { items, totalItems, url } = storeToRefs(tableStore);

const currentTime = ref(0);
const snackbar = ref<boolean>(false);

const destroy = async () => {
  snackbar.value = false;

  if (props.functionExternal) return emit("remove");

  try {
    loading.start();

    interface Response {
      message: string;
      success: boolean;
    }

    const { success, message } = await $api<Response>(
      `/${props.urlLocal ?? url.value}`,
      {
        method: "DELETE",
        query: {
          id: props.id,
        },
      }
    );

    if (!success) return $toast().error(message);

    $toast().success(message);

    if (props.spliceExternal) return emit("remove");

    const index = useArrayFindIndex(
      items.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: Record<string, any>) => e.id == props.id
    );

    items.value.splice(index.value, 1);

    totalItems.value -= 1;
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusMessage}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    size="small"
    color="pink"
    density="comfortable"
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
    <div class="text-subtitle-1">Deletar dados</div>

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
