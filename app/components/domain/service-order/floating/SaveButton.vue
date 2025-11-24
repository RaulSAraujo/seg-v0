<script setup lang="ts">
import { useServiceOrderApi } from "../../api/useServiceOrderApi";

const { params } = useRoute();

const { update } = useServiceOrderApi();
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    @click="update(params.id as string)"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
