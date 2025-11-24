<script lang="ts" setup>
const props = defineProps<{
  value: string | Array<unknown>;
}>();

const emit = defineEmits(["update"]);

const fixedValues = computed({
  get: () => {
    if (typeof props.value == "object") {
      const formattedJSON = JSON.stringify(props.value);

      return formattedJSON;
    } else {
      return props.value;
    }
  },
  set: (newValue) => {
    emit("update", newValue);
  },
});
</script>

<template>
  <v-card elevation="0" density="compact">
    <template #title>
      <span class="text-body-1">Associação fixa</span>
    </template>

    <template #subtitle>
      <span class="text-caption">Adicione dados fictícios a lista (JSON)</span>
    </template>

    <template #text>
      <v-row dense>
        <v-col>
          <UiTextArea v-model="fixedValues" rows="5" rounded="lg" />
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
