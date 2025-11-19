<script setup lang="ts">
definePageMeta({
  path: "/produto-compra/:id/status-do-produto",
});
</script>

<template>
  <div>
    <v-toolbar title="STATUS DO PRODUTO" rounded="t-xl" class="pr-4">
      <ProductStatusTableStatusAssociation />
    </v-toolbar>

    <v-container fluid>
      <ProductStatusTable />
    </v-container>
  </div>
</template>
