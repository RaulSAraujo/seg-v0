<script setup lang="ts">
useHead({
  titleTemplate: `Transferência - %s`,
});

definePageMeta({
  path: "/transferencia",
});

const { data: reasons } = await $api<{ id: number; description: string }[]>(
  "stock-transfer/get-request-reasons",
  {
    key: "stock-transfer-request-reasons",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

const { data: warehouses } = await $api<{ id: number; description: string }[]>(
  "stock-transfer/get-warehouses",
  {
    key: "stock-transfer-warehouses",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">TRANSFERÊNCIA</span>

    <UiFilter>
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'transfer-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable show-select multi-sort>
      <template #item.user_id="{ item }">
        <UiTooltip :text="item.User.name" :vw="5" />
      </template>

      <template #item.request_reason="{ item }">
        <TransferTemplateReason
          :reasons="reasons ?? []"
          :request-reason="item.request_reason"
        />
      </template>

      <template #item.target_warehouse="{ item }">
        <TransferTemplateWarehouse
          :warehouses="warehouses ?? []"
          :warehouse-id="item.target_warehouse"
        />
        {{ item.target_warehouse }}
      </template>

      <template #item.origin_warehouse="{ item }">
        <TransferTemplateWarehouse
          :warehouses="warehouses ?? []"
          :warehouse-id="item.origin_warehouse"
        />
      </template>

      <template #item.name="{ item }">
        {{ item.Product.name }}
      </template>
    </UiTable>
  </div>
</template>
