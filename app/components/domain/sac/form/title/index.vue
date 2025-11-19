<script lang="ts" setup>
import Sellers from './input/Sellers.vue';

defineOptions({
  name: "SacFormTitle",
});

defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="d-flex justify-space-between mx-4">
    <span class="text-h6 text-primary text-uppercase font-weight-black">
      {{ title }}
    </span>

    <div style="width: 200px">
      <Sellers />
    </div>
  </div>
</template>
