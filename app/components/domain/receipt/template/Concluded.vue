<script lang="ts" setup>
const props = defineProps<{
  receivingQuantity: number;
  quantityPurchased: number;
}>();

const icon = ref("");

const color = ref("");

const computedIcon = () => {
  if (props.receivingQuantity === 0) {
    icon.value = "mdi-close-circle";

    color.value = "red";
  } else if (props.receivingQuantity < props.quantityPurchased) {
    icon.value = "mdi-progress-close";

    color.value = "blue";
  } else if (props.receivingQuantity >= props.quantityPurchased) {
    icon.value = "mdi-check-circle";

    color.value = "green";
  }
};

computedIcon();

watch(
  () => props.receivingQuantity,
  () => computedIcon()
);
</script>

<template>
  <v-icon :icon="icon" :color="color" />
</template>
