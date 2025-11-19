<script lang="ts" setup>
defineEmits(["active"]);
</script>

<template>
  <v-btn class="mr-2" color="primary" text="IMPORTAR" @click="$emit('active')" />
</template>
