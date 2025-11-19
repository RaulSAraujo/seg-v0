<script lang="ts" setup>
const emit = defineEmits(["update-value", "update-label"]);

interface Indicators {
  FUNCIONARIO: number;
  NOME: string;
}

const { data, status } = $api<Indicators[]>("invoice-rule/indicators", {
  key: "invoice-rule-indicators",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const select = ref<Indicators | null>(null);

watch(
  () => select.value,
  (value) => {
    emit("update-value", value?.FUNCIONARIO);

    emit("update-label", value?.NOME);
  }
);

defineExpose({ select });
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    v-model="select"
    label="Marca"
    :items="data ?? []"
    item-title="NOME"
    item-value="FUNCIONARIO"
    :multiple="false"
    :clearable="true"
    :return-object="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
