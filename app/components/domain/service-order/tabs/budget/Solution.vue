<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { solutionDescription } = storeToRefs(serviceOrderStore);

const tiptap = ref();

watch(
  () => tiptap.value,
  (value) => {
    console.log(value);
  }
);
</script>

<template>
  <div class="divTipTap">
    <p class="text-h6 font-weight-medium text-primary my-3 ml-4">SOLUÇÃO:</p>

    <div class="px-5 pb-2">
      <UiTextArea v-model="solutionDescription" variant="plain" :rows="5" hide-details />
    </div>
  </div>
</template>

<style scoped>
.divTipTap {
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
