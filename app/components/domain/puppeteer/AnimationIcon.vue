<script lang="ts" setup>
onMounted(() => {
  setInterval(() => {
    visible.value = !visible.value;
  }, 700);
});

const visible = ref<boolean>(false);
</script>

<template>
  <span :class="{ show: visible, hide: !visible }"> | </span>
</template>

<style>
.show {
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
}
.hide {
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}
</style>
