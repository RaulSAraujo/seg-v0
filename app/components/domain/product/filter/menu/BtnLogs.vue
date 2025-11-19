<script setup lang="ts"></script>

<template>
  <v-tooltip
    location="top"
    text="LOGS DE PRODUTO COMPRA"
    content-class="bg-purple"
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-math-log"
        class="text-purple"
        :to="{
          name: 'product-logs',
        }"
      />
    </template>
  </v-tooltip>
</template>
