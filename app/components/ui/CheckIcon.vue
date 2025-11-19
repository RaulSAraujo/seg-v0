<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  attr?: string;
  body?: object;
  value: boolean;
  url?: string;
  readonly?: boolean;
  disabled?: boolean;
  enableAlert?: boolean;
  exportSave?: boolean;
}>();

const emit = defineEmits(["updateValue", "exportSave"]);

const loading = useLoadingIndicator();

const { url: urlStore } = useTableStore();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const comp = computed({
  get: () => props.value,
  set: async (value) => {
    if (props.exportSave) {
      return emit("exportSave", value);
    }

    try {
      loading.start();

      const res = await update(value);

      if (!res.success) return $toast().error(res.message);

      emit("updateValue", value);
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data.data.error ?? err.statusMessage}`);
    } finally {
      loading.finish();
    }
  },
});

const update = async (value: boolean) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  return await $api<Response>(`/proxy/${props.url ?? urlStore}`, {
    method: "PUT",
    body: {
      id: props.id,
      [props.attr!]: value,
      ...props.body,
    },
  });
};
</script>

<template>
  <v-btn
    :icon="value ? 'mdi-check-bold' : 'mdi-close-thick'"
    :color="value ? 'green' : 'red'"
    size="30"
    variant="text"
    :readonly="readonly"
    :disabled="disabled"
    @click="enableAlert ? (snackbar = true) : (comp = !comp)"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deseja atualizar ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn
        color="white"
        variant="plain"
        @click="
          comp = !comp;
          snackbar = false;
        "
      >
        Sim
      </v-btn>
    </template>
  </v-snackbar>
</template>
