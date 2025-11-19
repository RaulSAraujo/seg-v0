<script lang="ts" setup>
defineOptions({
  name: "WarrantyFilter",
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
          name: 'warranty-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
