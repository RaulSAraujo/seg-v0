<script lang="ts" setup>
defineOptions({
  name: "CounterOrderTable",
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
          name: 'counter-order-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
