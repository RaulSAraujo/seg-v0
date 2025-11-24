<script lang="ts" setup>
import type { ImportedInvoices } from "~/interfaces/ShippingValidation";

defineProps<{
  importedInvoices: ImportedInvoices[] | null;
}>();

const headers = [
  { title: "Numero da fatura", key: "nro_fatura" },
  { title: "Preço do frete", key: "bill_freight_price" },
];
</script>

<template>
  <v-dialog width="20vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        prepend-icon="mdi-invoice-import"
        stacked
        class="text-cyan"
        variant="plain"
        density="compact"
        :disabled="importedInvoices == null || importedInvoices!.length == 0"
      />
    </template>

    <template #default>
      <v-card rounded="xl" title="FATURAS IMPORTADAS">
        <template #text>
          <v-data-table
            :headers="headers"
            :items="importedInvoices ?? []"
            items-per-page="-1"
            hide-default-footer
            disable-sort
          >
            <template #item.bill_freight_price="{ item }">
              <UiToLocaleString :value="item.bill_freight_price" />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
