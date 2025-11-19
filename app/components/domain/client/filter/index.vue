<script lang="ts" setup>
defineOptions({
  name: "ClientFilter",
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
          name: 'client-new',
        }"
      />
    </template>
  </UiFilter>
</template>
