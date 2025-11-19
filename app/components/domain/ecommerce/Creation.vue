<script setup lang="ts"></script>

<template>
  <v-dialog width="300px">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <template #default="{ isActive }">
      <EcommerceForm
        title="NOVO E-COMMERCE"
        method-rest="POST"
        @close="isActive.value = false"
      />
    </template>
  </v-dialog>
</template>
