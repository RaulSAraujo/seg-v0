<script setup lang="ts">
import type { SalesOrder } from "~/interfaces/SalesCollections";

useHead({
  titleTemplate: `Romaneio - %s`,
});

definePageMeta({
  path: "/romaneio",
});

const updateSalesOrders = (salesOrders: SalesOrder[]) => {
  salesOrders.forEach((e) => (e.verified_status_ecom = true));
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ROMANEIO</span>

    <UiFilter>
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'romaneio-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable multi-sort :show-expand="true">
      <template #item.action="{ item }">
        <RomaneioAlterStatus
          :sales-order="item.SalesOrders"
          :sales-collection-id="item.id"
          @update="updateSalesOrders(item.SalesOrders)"
        />

        <UiDelete :id="item.id" />
      </template>

      <template #item.pdf="{ item }">
        <LazyRomaneioPdf :id="item.id" />
      </template>

      <template #item.observation="{ item }">
        <UiEditDialogString
          :id="item.id"
          :text="item.observation"
          :vw="5"
          attr="observation"
          @update-text="item.observation = $event"
        />
      </template>

      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="pa-0">
            <RomaneioTemplateTable :sales-orders="item.SalesOrders" />
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>
