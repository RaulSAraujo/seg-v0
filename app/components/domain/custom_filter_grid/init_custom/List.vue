<script lang="ts" setup>
import { useSortable } from "@vueuse/integrations/useSortable";
import type { Row } from "~/interfaces/CustomFilterGrid";

const props = defineProps<{
  active: Row[];
  deactivated: Row[];
}>();

const emit = defineEmits(["add", "remove"]);

const el = ref<HTMLElement>();

useSortable(el, props.active, {
  handle: ".handle",
});

const add = (index: number, item: Row) => {
  emit("add", index, item);
};

const remove = (index: number, item: Row) => {
  emit("remove", index, item);
};
</script>

<template>
  <div
    class="mt-2 px-2"
    style="
      height: 70vh;
      overflow-x: hidden;
      overflow-y: scroll;
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
  >
    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="(item, index) in deactivated"
            :key="item.attribute"
            :title="item.label"
          >
            <template #append>
              <v-btn
                icon="mdi-plus"
                base-color="green"
                size="small"
                variant="plain"
                density="comfortable"
                @click="add(index, item)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col>
        <v-list ref="el">
          <v-list-item
            v-for="(item, index) in active"
            :key="item.attribute"
            :title="item.label"
          >
            <template #append>
              <v-icon
                class="handle"
                icon="mdi-arrow-all"
                color="blue"
                size="small"
              />

              <v-btn
                icon="mdi-close"
                base-color="red"
                size="small"
                variant="plain"
                density="comfortable"
                @click="remove(index, item)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>
