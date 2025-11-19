<script setup lang="ts">
import type { Row } from "~/interfaces/Package";

const productStore = useProductStore();
const { product, productPackage, productMeasurementsChanged, packageList } =
  storeToRefs(productStore);

// Converter para array mutável para uso no template
const packageListItems = computed(() => [...(packageList.value ?? [])]);

const packageSelect = ref<number | "Personalizada">(
  product.value?.package_id ?? "Personalizada"
);

const setPackage = (packageData: Row) => {
  if (!product.value) return;

  productMeasurementsChanged.value = true;

  product.value.package_id = packageData.id;

  productPackage.value = packageData;

  product.value.height = parseFloat(`${packageData.height ?? 0}`).toFixed(2);
  product.value.width = parseFloat(`${packageData.width ?? 0}`).toFixed(2);
  product.value.length = parseFloat(`${packageData.length ?? 0}`).toFixed(2);
};

onMounted(async () => {
  await productStore.fetchPackages();

  if (product.value && packageSelect.value === "Personalizada") {
    // Buscar diretamente no array ao invés de usar useArrayFind com readonly ref
    const packages = packageList.value ?? [];
    const find = packages.find((e) => e.name === "Personalizada");

    if (find) {
      product.value.package_id = find.id;

      productPackage.value = find ?? ({} as Row);
    }
  }
});
</script>

<template>
  <UiSelect
    v-model="packageSelect"
    label="Embalagem"
    :items="packageListItems"
    item-title="name"
    item-value="id"
    :multiple="false"
    :return-object="true"
    @update:model-value="setPackage"
  />
</template>
