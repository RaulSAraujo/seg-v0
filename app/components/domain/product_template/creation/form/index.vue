<script lang="ts" setup>
import Apparatus from "./Apparatus.vue";
import CategoryEcom from "./CategoryEcom.vue";

import type { Form } from "~/interfaces/TemplateConfig";

defineOptions({
  name: "ProductTemplateCreation",
});

const props = defineProps<{
  form: Form;
  description: string;
}>();

const emit = defineEmits(["setDescription"]);

const tiptap = ref();
const formComputed = computed(() => props.form);

watch(
  () => tiptap.value?.getHTML(),
  (value) => {
    emit("setDescription", value);
  }
);

watch(
  () => props.description,
  (value) => {
    if (value === "") {
      tiptap.value?.editor.commands.clearContent();
    }
  }
);
</script>

<template>
  <div>
    <v-row dense>
      <v-col cols="3">
        <Apparatus v-model="formComputed.apparatus_id" />
      </v-col>

      <v-col cols="3">
        <CategoryEcom
          :apparatus-id="formComputed.apparatus_id"
          @update-category-id="formComputed.category_id = $event"
        />
      </v-col>
    </v-row>

    <div class="divTipTap px-3 py-5 mt-2">
      <UiTiptap ref="tiptap" :editable="true" />
    </div>
  </div>
</template>

<style scoped>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}
</style>
