<script lang="ts" setup>
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps<{
  index: number;
  values: string[];
  visible: boolean;
}>();

const visibleComputed = computed(() => props.visible);

defineEmits(["hide"]);
</script>

<template>
  <v-dialog
    v-model="visibleComputed"
    fullscreen
    transition="dialog-top-transition"
  >
    <template #default>
      <VueEasyLightbox
        :imgs="values"
        :index="index"
        :visible="visible"
        @hide="$emit('hide')"
      />
    </template>
  </v-dialog>
</template>
