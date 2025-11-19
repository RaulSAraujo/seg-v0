<script setup lang="ts">
defineEmits(["add"]);

const activeScanMode = ref(true);
</script>

<template>
  <div class="d-flex">
    <TransferFindServerCombobox v-if="activeScanMode" />

    <TransferFindServerScanMode v-else />

    <v-tooltip
      location="top"
      :text="activeScanMode ? 'Ativar o modo coletor' : 'Desativar modo coletor'"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :icon="activeScanMode ? 'mdi-barcode-scan' : 'mdi-barcode-off'"
          color="blue"
          variant="plain"
          @click="activeScanMode = !activeScanMode"
        />
      </template>
    </v-tooltip>
  </div>
</template>
