<script lang="ts" setup>
defineEmits(["active"]);
</script>

<template>
  <v-btn
    class="mr-2"
    text="CRIAR"
    rounded="lg"
    color="primary"
    @click="$emit('active')"
  />
</template>
