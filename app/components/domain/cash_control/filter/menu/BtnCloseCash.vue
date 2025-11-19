<script lang="ts" setup>
defineOptions({
  name: "CashControlCloseButton",
});

const snackbar = useState<boolean>("active-close-cash-control", () => false);
</script>

<template>
  <v-tooltip location="top" text="FECHAR CAIXA" content-class="bg-pink">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-cash-register"
        class="text-pink"
        @click="snackbar = true"
      />
    </template>
  </v-tooltip>
</template>
