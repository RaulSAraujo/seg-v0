<script lang="ts" setup>
defineProps<{
  inSeparation: number;
}>();

defineEmits(["active"]);
</script>

<template>
  <v-btn
    :text="`EM SEPARAÇÃO: ${inSeparation}`"
    variant="text"
    color="yellow"
    @click="$emit('active', 'ZQ')"
  />
</template>
