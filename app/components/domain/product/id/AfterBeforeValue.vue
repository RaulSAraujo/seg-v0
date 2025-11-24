<script lang="ts" setup>
defineProps<{
  before: string;
  after: string;
}>();
</script>

<template>
  <div class="d-inline-block text-truncate">
    <span v-if="before !== after" class="text-red">
      {{ before }}
    </span>

    <v-icon v-if="before !== after" icon="mdi-arrow-right-thin" />

    <span :class="before !== after ? 'text-green' : ''">
      {{ after }}
    </span>
  </div>
</template>
