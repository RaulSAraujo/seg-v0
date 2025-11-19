<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  attr?: string;
  url?: string;
  body?: object;
  date: string | null;
  exportSave?: boolean;
  clearable: boolean | undefined;
}>();

const emit = defineEmits(["updateText", "exportSave"]);

const { url: urlStore } = useTableStore();

const loadingIndicator = useLoadingIndicator();
const { brDate, databaseDate } = useDateConversion();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => brDate(props.date ?? ""),
  set: async (value) => {
    if (props.exportSave) {
      menu.value = false;

      return emit("exportSave", value);
    }

    try {
      loadingIndicator.start();

      const res = await update(value);

      if (!res.success) return $toast().error(res.message);

      menu.value = false;

      emit("updateText", value);
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data.data.error ?? err.statusMessage}`);
    } finally {
      loadingIndicator.finish();
    }
  },
});

const update = async (value: string) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  if (!props.attr || !props.id) {
    return {
      success: false,
      message: "Parâmetros inválidos no input.",
    };
  }

  return await $api<Response>(`/proxy/${props.url ?? urlStore}`, {
    method: "PUT",
    body: {
      id: props.id,
      [props.attr]: value ? databaseDate(value) : null,
      ...props.body,
    },
  });
};
</script>

<template>
  <v-menu
    v-model="menu"
    location="end"
    transition="slide-x-transition"
    offset="0 20"
    :close-on-content-click="false"
  >
    <template #activator="{ props: menuProp }">
      <div v-if="!date" v-bind="menuProp" :style="`cursor: pointer`">
        <v-label />
      </div>

      <span v-bind="menuProp" style="cursor: pointer">
        <UiDateString :date="date" />
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-text-field
              v-model="proxyModel.value"
              v-maska="'##/##/####'"
              density="compact"
              color="primary"
              :clearable="clearable"
              hide-details
            />
          </template>

          <template #actions>
            <v-spacer />

            <component :is="actions" />
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-menu>
</template>
