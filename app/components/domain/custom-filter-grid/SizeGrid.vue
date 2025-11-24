<script lang="ts" setup>
const props = defineProps<{
  value: number;
}>();

const emit = defineEmits(["update"]);

const width = computed({
  get: () => props.value,
  set: (newValue) => {
    emit("update", newValue);
  },
});
</script>

<template>
  <v-card elevation="0" density="compact">
    <template #title>
      <span class="text-body-1">Informe o tamanho da grid</span>
    </template>

    <template #subtitle>
      <span class="text-caption">Defina o tamanho do campo no filtro.</span>
    </template>

    <template #text>
      <v-slider
        v-model="width"
        max="420"
        min="50"
        step="15"
        tick-size="4"
        :show-ticks="false"
        thumb-label="always"
        color="primary"
        hide-details
        class="mt-5"
      />
    </template>
  </v-card>
</template>
