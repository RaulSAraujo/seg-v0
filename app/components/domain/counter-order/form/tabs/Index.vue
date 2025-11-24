<script lang="ts" setup>
import Body from "./Body.vue";
import Header from "./Header.vue";

defineOptions({
  name: "CounterOrderTabs",
});

const tab = ref(1);
</script>

<template>
  <Header :tab="tab" @update="tab = $event" />

  <v-divider color="primary" opacity="0.8" />

  <Body :tab="tab" @update="tab = $event" />
</template>
