<script lang="ts" setup>
defineOptions({
  name: "PurchaseRequestCreationFormReset",
});

defineEmits(["clear"]);
</script>

<template>
  <v-btn
    text="REDEFINIR"
    variant="outlined"
    color="primary"
    class="mx-2"
    @click="$emit('clear')"
  />
</template>
