<script lang="ts" setup>
const props = defineProps<{
  file: string;
  name: string;
  hideText?: boolean;
  activeRemove?: boolean;
}>();

const { params } = useRoute();

defineEmits(["dblclick", "remove"]);

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
  <v-img
    cover
    :src="file"
    rounded="xl"
    aspect-ratio="1"
    class="align-end"
    @dblclick="$emit('dblclick')"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5" />
      </v-row>
    </template>

    <v-btn
      v-if="activeRemove"
      icon="mdi-close"
      variant="plain"
      density="compact"
      class="bg-red text-white"
      style="position: absolute; top: 10px; right: 0px"
      @click="$emit('remove')"
    />

    <v-sheet
      v-if="!hideText"
      width="100%"
      class="pa-1 text-center"
      color="rgb(0,0,0,0.5)"
    >
      <span class="body-1 white--text">
        {{ nameComputed }}
      </span>
    </v-sheet>
  </v-img>
</template>
