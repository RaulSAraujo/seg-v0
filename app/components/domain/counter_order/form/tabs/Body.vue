<script lang="ts" setup>
import Logs from "./logs.vue";
import Budget from "./budget/Index.vue";
import InformationCenter from "./information_center/Index.vue";

defineOptions({
  name: "CounterOrderTabsBody",
})

const props = defineProps<{
  tab: number;
}>();

const emit = defineEmits(["update"]);

const tabComputed = computed({
  get: () => props.tab,
  set: (newValue) => {
    return emit("update", newValue);
  },
});
</script>

<template>
  <v-tabs-window v-model="tabComputed">
    <v-tabs-window-item :value="1">
      <Budget />
    </v-tabs-window-item>

    <v-tabs-window-item :value="2">
      <InformationCenter />
    </v-tabs-window-item>

    <v-tabs-window-item :value="3">
      <Logs />
    </v-tabs-window-item>
  </v-tabs-window>
</template>
