<script setup lang="ts">
import { mergeProps } from "vue";

import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  vw: number;
  attr?: string;
  url?: string;
  body?: object;
  text: string | null;
  exportSave?: boolean;
}>();

const emit = defineEmits(["updateText", "exportSave"]);

const loadingIndicator = useLoadingIndicator();

const { url: urlStore } = useTableStore();

const menu = ref<boolean>(false);

const widthColumnText = (label: string | null) => {
  if (typeof label === "string" && label.length > 0) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = "14px Poppins";

    return context?.measureText(label).actualBoundingBoxRight ?? 0;
  }
  return 0;
};

const convertVwToPx = (vw: number) => {
  const viewportWidth = window.innerWidth;
  return (vw / 100) * viewportWidth;
};

const comp = computed({
  get: () => props.text,
  set: async (value) => {
    if (typeof value != "string") return;

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
      [props.attr]: value,
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
      <v-tooltip
        v-if="widthColumnText(text ?? '') > convertVwToPx(vw)"
        location="top"
        :text="text?.toUpperCase()"
        style="
          --v-theme-surface-variant: 25, 118, 210;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <div
            v-bind="mergeProps(menuProp, tooltip)"
            :style="` cursor: pointer;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              width: ${vw}vw;`"
          >
            <span>{{ text?.toUpperCase() }}</span>
          </div>
        </template>
      </v-tooltip>

      <div
        v-else-if="widthColumnText(text ?? '') < convertVwToPx(vw) && !text"
        v-bind="menuProp"
        :style="`cursor: pointer; width: ${vw}vw;margin: auto`"
      >
        <v-btn variant="plain" block />
      </div>

      <span v-else v-bind="menuProp" style="cursor: pointer">
        {{ text?.toUpperCase() }}
      </span>
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-text-field
              v-model="proxyModel.value"
              v-maska="'X'"
              density="compact"
              color="primary"
              :clearable="true"
              hide-details
              @click:clear="proxyModel.value = ''"
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
