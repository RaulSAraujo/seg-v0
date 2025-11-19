<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  attr?: string;
  url?: string;
  body?: object;
  exportSave?: boolean;
  value: string | number | null;
}>();

const emit = defineEmits(["updateText", "exportSave", "menu"]);

const loadingIndicator = useLoadingIndicator();

const { url: urlStore } = useTableStore();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => parseFloat(`${props.value}`),
  set: async (value) => {
    if (typeof value != "number") return;

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

const update = async (value: number) => {
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
      [props.attr]: value,
      ...props.body,
    },
  });
};

watch(
  () => menu.value,
  () => {
    emit("menu", menu.value);
  }
);
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
      <UiToLocaleString
        v-bind="menuProp"
        :value="value"
        style="cursor: pointer"
      />
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <UiCurrencyField v-model="proxyModel.value" />
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
