<script lang="ts" setup>
defineProps<{
  inTransfer: number;
}>();

defineEmits(["active"]);
</script>

<template>
  <v-btn
    :text="`EM TRANSFERÊNCIA: ${inTransfer}`"
    variant="text"
    color="teal"
    @click="$emit('active', 'ZP')"
  />
</template>
