<script setup lang="ts">
defineOptions({
  name: "ProductStatus",
});

const props = defineProps<{
  pstatuses: {
    name: string;
  }[];
}>();

const status = computed(() => props.pstatuses.map((e) => e.name).join(", "));
</script>

<template>
  <UiTooltip :text="status" :vw="4" />
</template>
