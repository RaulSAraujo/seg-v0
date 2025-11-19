<script lang="ts" setup>
defineOptions({
  name: "OrderImportFilter",
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
          name: 'order-import-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
