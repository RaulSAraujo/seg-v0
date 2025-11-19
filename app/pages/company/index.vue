<script setup lang="ts">
import type { Row } from "~/interfaces/Company";
useHead({
  titleTemplate: `Empresas - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/empresas",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const fantasyName = (id: number) => {
  const find = (items.value as Row[])?.find((item) => item.id == id);

  return find?.fantasy_name ?? "";
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">EMPRESAS</span>

    <UiFilter>
      <template #button-create>
        <CompanyCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <UiDelete :id="item.id" />
      </template>

      <template #item.invoice_company_reference="{ item }">
        <UiEditDialogObject
          :id="item.id"
          attr="invoice_company_reference"
          :value="item.invoice_company_reference"
          :items="items"
          item-title="fantasy_name"
          item-value="id"
          @update-text="item.invoice_company_reference = $event"
        >
          <template #default="props">
            <span v-bind="props">{{
              fantasyName(item.invoice_company_reference)
            }}</span>
          </template>
        </UiEditDialogObject>
      </template>
    </UiTable>
  </div>
</template>
