<script lang="ts" setup>
defineOptions({
  name: "ClassificationMenu",
});
</script>

<template>
  <v-tooltip location="top" text="CLASSIFICAÇÃO DE APARELHOS">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-sort-alphabetical-ascending-variant"
        :to="{
          name: 'apparatus-classification',
        }"
      />
    </template>
  </v-tooltip>
</template>
