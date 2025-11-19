<script setup lang="ts">
const { params } = useRoute();
</script>

<template>
  <div>
    <v-toolbar
      :title="`FAMILIA ATUAL: ${params.type_id}`"
      rounded="t-xl"
      class="pr-4"
    >
      <ProductFamilyChange v-if="params.type == 'family'" />

      <ProductKitChangeComposition v-if="params.type == 'kit'" />
    </v-toolbar>

    <v-container fluid>
      <ProductFamilyTable v-if="params.type === 'family'" />

      <ProductKitTable v-if="params.type === 'kit'" />
    </v-container>
  </div>
</template>
