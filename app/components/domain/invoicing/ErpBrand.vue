<script lang="ts" setup>
const emit = defineEmits(["update-value", "update-label"]);

interface ErpBrand {
  MARCA: number;
  DESCRMARCA: string;
}

const { data, status } = $api<ErpBrand[]>("erp-brand", {
  key: "erp-brand",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const select = ref<ErpBrand | null>(null);

watch(
  () => select.value,
  (value) => {
    emit("update-value", value?.MARCA);

    emit("update-label", value?.DESCRMARCA);
  }
);

defineExpose({ select });
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    v-model="select"
    label="Indicador"
    :items="data ?? []"
    item-title="DESCRMARCA"
    item-value="MARCA"
    :multiple="false"
    :clearable="true"
    :return-object="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
