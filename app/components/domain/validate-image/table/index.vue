<script lang="ts" setup>
import type { Row } from "~/interfaces/ValidateProductsImage";

import Status from "./templates/Status.vue";

defineOptions({
  name: "ValidateImageTable",
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }: { item: Row }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.status="{ item }">
      <Status
        :id="item.id"
        :status="item.status"
        @save="item.status = $event"
      />
    </template>

    <template #item.supplier="{ item }: { item: Row }">
      <span>
        {{ item.Product.brand }}
      </span>
    </template>

    <template #item.produto_chave="{ item }: { item: Row }">
      <span>{{ item.Product.produto_chave }}</span>
    </template>

    <template #item.description="{ item }: { item: Row }">
      <UiTooltip :text="item.Product.description" :vw="15" />
    </template>

    <template #item.user_id="{ item }: { item: Row }">
      <UiTooltip :text="item.User.name" :vw="8" />
    </template>

    <template #item.observation="{ item }: { item: Row }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation"
        attr="observation"
        :vw="5"
        @update-text="item.observation = $event"
      />
    </template>

    <template #item.quantity="{ item }: { item: Row }">
      <UiCheckIcon
        :id="item.id"
        :value="item.Product.quantity > 0"
        :readonly="true"
      />
    </template>
  </UiTable>
</template>
