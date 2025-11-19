<script setup lang="ts">
const props = defineProps<{
  file: string;
  name: string;
  hideText?: boolean;
  activeRemove?: boolean;
}>();

defineEmits(["click", "remove"]);

const { params } = useRoute();

const theme = useTheme();

const nameComputed = computed(() => {
  const name = props.name
    .replace(`${params.id}`, "")
    .replace("_", "")
    .toUpperCase();

  if (name.length > 10) {
    return `${name.substring(0, 10)}...`;
  }

  return name;
});
</script>

<template>
  <div
    class="d-flex flex-column align-center"
    style="cursor: pointer; position: relative"
  >
    <v-btn
      v-if="activeRemove"
      icon="mdi-close"
      variant="plain"
      density="compact"
      class="bg-red text-white"
      style="position: absolute; top: 10px; right: 0px"
      @click="$emit('remove')"
    />

    <v-img
      width="95%"
      rounded="xl"
      aspect-ratio="1"
      src="/img/pdf.png"
      class="align-end"
      :style="theme.current.value.dark ? 'filter: invert(1)' : ''"
      @click="$emit('click', file)"
    />

    <v-sheet
      v-if="!hideText"
      width="100%"
      color="transparent"
      class="pa-1 text-center"
    >
      <span class="body-1 white--text">
        {{ nameComputed }}
      </span>
    </v-sheet>
  </div>
</template>
