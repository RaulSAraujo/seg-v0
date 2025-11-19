<script lang="ts" setup>
import BtnCreation from "./BtnCreation.vue";
import ClassificationApparatus from "./menu/Classification.vue";

defineOptions({
  name: "ApparatusFilter",
});

defineEmits(["active"]);
</script>

<template>
  <UiFilter>
    <template #button-create>
      <BtnCreation @active="$emit('active')" />
    </template>

    <template #menu>
      <ClassificationApparatus />
    </template>
  </UiFilter>
</template>
