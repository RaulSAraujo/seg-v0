<script lang="ts" setup>
defineOptions({
  name: "SaleSacFilter",
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
          name: 'sac-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
