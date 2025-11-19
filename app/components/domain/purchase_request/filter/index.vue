<script lang="ts" setup>
defineOptions({
  name: "PurchaseRequestFilter",
});
</script>

<template>
  <UiFilter>
    <template #button-create>
      <v-btn
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
        :to="{
          name: 'purchase-request-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
