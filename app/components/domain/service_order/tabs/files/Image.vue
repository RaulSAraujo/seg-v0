<script lang="ts" setup>
defineProps<{
  file: string;
  name: string;
}>();

defineEmits(["click"]);

const { params } = useRoute();
</script>

<template>
  <v-img
    :src="file"
    aspect-ratio="1"
    cover
    rounded="xl"
    class="align-end border-sm"
    @click="$emit('click')"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5" />
      </v-row>
    </template>

    <v-sheet width="100%" class="pa-1 text-center" color="rgb(0,0,0,0.5)">
      <span class="body-1 white--text">
        {{ name.replace(`${params.id}`, "").replace("_", "").toUpperCase() }}
      </span>
    </v-sheet>
  </v-img>
</template>
