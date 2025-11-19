<script lang="ts" setup>
const props = defineProps<{
  value: string;
}>();

const emit = defineEmits(["update"]);

const align = computed({
  get: () => props.value,
  set: (newValue) => {
    emit("update", newValue);
  },
});
</script>

<template>
  <v-card elevation="0" density="compact">
    <template #title>
      <span class="text-body-1">Selecione um alinhamento</span>
    </template>

    <template #subtitle>
      <span class="text-caption">Este será o alinhamento na grid</span>
    </template>

    <template #text>
      <div class="d-flex justify-center">
        <v-btn-toggle v-model="align" variant="outlined" rounded="lg" color="primary">
          <v-btn icon="mdi-format-align-left" value="start" />

          <v-btn icon="mdi-format-align-center" value="center" />

          <v-btn icon="mdi-format-align-right" value="end" />

          <v-btn icon="mdi-grid-off" value=" d-none" />
        </v-btn-toggle>
      </div>
    </template>
  </v-card>
</template>
