<script lang="ts" setup>
const dialog = useState<boolean>("active-creation-cash-control", () => false);
</script>

<template>
  <v-btn
    class="mr-2"
    text="CRIAR"
    rounded="lg"
    color="primary"
    @click="dialog = true"
  />
</template>
