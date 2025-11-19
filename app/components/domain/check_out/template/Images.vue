<script setup lang="ts">
import type {
  EcomProductImages,
  ProductImage,
} from "~/interfaces/SalesOrder";

const props = defineProps<{
  saleId: string | number;
}>();

const { $customFetch } = useNuxtApp();

const dialog = ref(false);

const images = ref<ProductImage[]>([]);

watch(
  () => dialog.value,
  async () => {
    if (dialog.value) {
      const res = await $customFetch<EcomProductImages>(
        `/sales-order/ecom-product-images?ecom_order_id=${props.saleId}`
      );

      images.value = res.productImages;
    } else {
      images.value = [];
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="32vw">
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        icon="mdi-image-outline"
        variant="plain"
        color="primary"
        density="compact"
      />
    </template>

    <template #default>
      <v-card v-if="images" rounded="xl" title="Imagens">
        <template #text>
          <v-card v-for="(item, index) in images" :key="index" elevation="0">
            <v-img
              :src="item.images[0]"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              cover
              class="align-end ma-4 rounded-xl"
            >
              <v-card-title>{{ item.title }}</v-card-title>
            </v-img>
          </v-card>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
:deep(.v-avatar.v-avatar--size-default) {
  --v-avatar-height: 150px;
}
</style>
