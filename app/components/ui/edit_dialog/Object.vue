<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: string | number;
  url?: string;
  attr?: string;
  body?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  itemTitle?: string;
  itemValue?: string;
  exportSave?: boolean;
}>();

const emit = defineEmits(["updateText", "exportSave"]);

const loadingIndicator = useLoadingIndicator();

const { url: urlStore } = useTableStore();

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.value,
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
      <slot v-bind="menuProp" style="cursor: pointer" />
    </template>

    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-select
              v-model="proxyModel.value"
              density="compact"
              color="primary"
              :clearable="true"
              :items="items"
              :item-title="itemTitle"
              :item-value="itemValue"
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
