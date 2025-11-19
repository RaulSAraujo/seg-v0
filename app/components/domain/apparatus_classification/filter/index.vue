<script lang="ts" setup>
import BtnCreation from './BtnCreation.vue';

defineOptions({
  name: "ApparatusClassificationFilter",
});

defineEmits(["active"]);
</script>

<template>
  <UiFilter>
    <template #button-create>
      <BtnCreation @active="$emit('active')" />
    </template>
  </UiFilter>
</template>
