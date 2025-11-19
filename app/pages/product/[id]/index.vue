<script setup lang="ts"></script>

<template>
  <div>
    <v-toolbar title="DETALHES DO PRODUTO" rounded="t-xl">
      <template #append>
        <ProductIdMountAdDescriptionEcom />
      </template>
    </v-toolbar>

    <v-container :fluid="true">
      <ProductIdForm />

      <ProductIdBtnSubmit />

      <ProductIdBtnDelete />
    </v-container>
  </div>
</template>
