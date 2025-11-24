<script lang="ts" setup>
import One from "./One/Index.vue";
import Two from "./Two/Index.vue";
import Three from "./Three/Index.vue";
</script>

<template>
  <v-stepper-window>
    <v-stepper-window-item :value="1">
      <One />
    </v-stepper-window-item>

    <v-stepper-window-item :value="2">
      <Two />
    </v-stepper-window-item>

    <v-stepper-window-item :value="3">
      <Three />
    </v-stepper-window-item>
  </v-stepper-window>
</template>
