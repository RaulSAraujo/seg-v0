<script lang="ts" setup>
defineOptions({
  name: "CounterOrderTabsHeader",
});

const props = defineProps<{
  tab: number;
}>();

const emit = defineEmits(["update"]);

const { params } = useRoute();

const tabComputed = computed({
  get: () => props.tab,
  set: (newValue) => {
    return emit("update", newValue);
  },
});
</script>

<template>
  <v-tabs
    v-model="tabComputed"
    mandatory
    hide-slider
    density="comfortable"
    selected-class="bg-primary rounded-t-xl"
    :disabled="!params.id"
  >
    <v-tab :value="1" class="rounded-t-xl">Orçamento</v-tab>

    <v-tab :value="2" class="rounded-t-xl">Central de informações</v-tab>

    <v-tab :value="3" class="rounded-t-xl">Logs</v-tab>
  </v-tabs>
</template>
