<script setup lang="ts">
defineProps<{
  text: string | null | undefined;
  vw: number;
}>();

defineEmits(["dblclick"]);

const widthColumnText = (label: string | null) => {
  if (typeof label === "string" && label.length > 0) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = "15px Poppins";

    return context?.measureText(label).actualBoundingBoxRight ?? 0;
  }
  return 0;
};

const convertVwToPx = (vw: number) => {
  const viewportWidth = window.innerWidth;
  return (vw / 100) * viewportWidth;
};
</script>

<template>
  <v-tooltip
    v-if="widthColumnText(text ?? '') > convertVwToPx(vw)"
    location="top"
    :text="text?.toUpperCase()"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <div
        :style="`white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          width: ${vw}vw;`"
        @dblclick="$emit('dblclick')"
      >
        <span v-bind="props"> {{ text?.toUpperCase() }} </span>
      </div>
    </template>
  </v-tooltip>

  <span v-else @dblclick="$emit('dblclick')">
    {{ text?.toUpperCase() }}
  </span>
</template>
