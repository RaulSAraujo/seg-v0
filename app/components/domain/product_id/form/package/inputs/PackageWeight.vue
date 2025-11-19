<script setup lang="ts">
const productStore = useProductStore();
const { product, productPackage } = storeToRefs(productStore);

const package_id = computed(() => product.value?.package_id ?? 1);
const height = computed(() => parseFloat(`${product.value?.height ?? 0}`));
const length = computed(() => parseFloat(`${product.value?.length ?? 0}`));
const width = computed(() => parseFloat(`${product.value?.width ?? 0}`));
const weight_cubic_kg = computed(
  () => productPackage.value.weight_cubic_kg ?? 0
);

const packageWeight = computed({
  get: () => productPackage.value.package_weight ?? 0,
  set: (newValue) => {
    productPackage.value.package_weight = newValue;
  },
});

if (product.value && productPackage.value) {
  packageWeight.value = !Number.isInteger(packageWeight.value)
    ? Math.ceil(parseFloat(`${packageWeight.value ?? 0.0}`) * 1000)
    : packageWeight.value ?? 0;
}

watch(
  () => package_id.value,
  (newValue) => {
    if (!product.value) return;

    if (!productPackage.value) return;

    if (newValue == null) packageWeight.value = 0;

    if (newValue === 1) return formatFirstPackaging();

    packageWeight.value = !Number.isInteger(packageWeight.value)
      ? Math.ceil(parseFloat(`${packageWeight.value ?? 0.0}`) * 1000)
      : packageWeight.value;
  }
);

const formatFirstPackaging = () => {
  if (product.value && productPackage.value === undefined) return;

  const mult = (height.value * length.value * width.value) / 6000;

  productPackage.value.package_weight = Math.ceil(
    mult * weight_cubic_kg.value * 1000
  );
};

if (package_id.value === 1) formatFirstPackaging();
</script>

<template>
  <UiTextField
    v-model="packageWeight"
    label="Peso da embalagem (g)"
    :disabled="true"
  />
</template>
