<script lang="ts" setup>
useHead({
  titleTemplate: `Tabelas diversas - %s`,
});

definePageMeta({
  path: "/tabelas-diversas",
});
</script>

<template>
  <div class="mt-5">
    <v-slide-group show-arrows center-active>
      <v-slide-group-item v-slot="{ isSelected, toggle }">
        <v-btn
          :color="isSelected ? 'primary' : undefined"
          text="CIDADE"
          variant="plain"
          :to="{
            name: 'several-tables-index-city',
          }"
          :class="isSelected ? 'text-h6 font-weight-black' : 'text-subtitle-1'"
          @click="toggle"
        />
      </v-slide-group-item>

      <v-slide-group-item v-slot="{ isSelected, toggle }">
        <v-btn
          :color="isSelected ? 'primary' : undefined"
          text="REGIÃO"
          variant="plain"
          :to="{
            name: 'several-tables-index-region',
          }"
          :class="isSelected ? 'text-h6 font-weight-black' : 'text-subtitle-1'"
          @click="toggle"
        />
      </v-slide-group-item>
    </v-slide-group>

    <NuxtPage />
  </div>
</template>
