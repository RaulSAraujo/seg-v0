<script lang="ts" setup>
useHead({
  titleTemplate: `Log de integrações - %s`,
});

definePageMeta({
  path: "/log-integracoes",
});
</script>

<template>
  <div class="mt-5">
    <v-slide-group show-arrows center-active>
      <v-slide-group-item v-slot="{ isSelected, toggle }">
        <v-btn
          :color="isSelected ? 'primary' : undefined"
          text="FILA ERP-SEG"
          variant="plain"
          :to="{
            name: 'integration-log-index-erp-seg',
          }"
          :class="isSelected ? 'text-h6 font-weight-black' : 'text-subtitle-1'"
          @click="toggle"
        />
      </v-slide-group-item>

      <v-slide-group-item v-slot="{ isSelected, toggle }">
        <v-btn
          :color="isSelected ? 'primary' : undefined"
          text="FILA SEG-ECOM"
          variant="plain"
          :to="{
            name: 'integration-log-index-seg-ecom',
          }"
          :class="isSelected ? 'text-h6 font-weight-black' : 'text-subtitle-1'"
          @click="toggle"
        />
      </v-slide-group-item>
    </v-slide-group>

    <NuxtPage />
  </div>
</template>
