<script setup lang="ts">
useHead({
  titleTemplate: `Validação de imagens - %s`,
});

definePageMeta({
  path: "/validacao-imagens",
});

const dialog = ref(false)

</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">VALIDAÇÃO DE IMAGENS</span>

    <ValidateImageFilter @active="dialog = true" />

    <ValidateImageTable />

    <ValidateImageCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
