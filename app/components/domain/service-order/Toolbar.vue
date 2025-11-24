<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { discountValue } = storeToRefs(serviceOrderStore);

const servicesStore = useServiceOrderServicesStore();
const { totalValueServices } = storeToRefs(servicesStore);

const productStore = useServiceOrderProductsStore();
const { totalValueProducts } = storeToRefs(productStore);

const totalValue = computed(
  () =>
    totalValueProducts.value +
    totalValueServices.value -
    parseFloat(discountValue.value || "0")
);
</script>

<template>
  <v-toolbar dense rounded="b-xl" color="black" class="px-5 text-toolbar">
    <template #default>
      <div class="d-flex">
        <span class="mr-2">Valor mão de obra:</span>

        <UiToLocaleString :value="totalValueServices" />
      </div>
      <v-divider vertical class="mx-2" />
      <div class="d-flex">
        <span class="mr-2">Valor produtos:</span>

        <UiToLocaleString :value="totalValueProducts" />
      </div>
      <v-divider vertical class="mx-2" />
      <div class="d-flex">
        <span class="mr-2">Desconto:</span>

        <ServiceOrderUpdateDiscount />
      </div>
      <v-divider vertical class="mx-2" />
      <div class="d-flex">
        <span class="mr-2">Valor total:</span>

        <UiToLocaleString :value="totalValue" />
      </div>
    </template>
  </v-toolbar>
</template>

<style scoped>
.text-toolbar {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 2.667;
  letter-spacing: 0.1666666667em;
  text-transform: uppercase;
}
</style>
