<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

defineProps<{
  items: Row[];
}>();

type TableHeader = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: TableHeader[] = [
  { title: "Código de fabricante", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "R$ fornecedor", key: "supplier_cost" },
  { title: "Qtd compra", key: "quantity_purchased", align: "center" },
  { title: "Qtd finalidade", key: "quantity_reserved", align: "center" },
  { title: "R$ Compra", key: "purchase_cost" },
  { title: "Finalidade", key: "reservation" },
  { title: "Data limite", key: "sending_limit_at" },
];
</script>

<template>
  <v-dialog max-width="70vw">
    <template #default="{ isActive }">
      <v-card title="PRODUTOS COM ERRO" rounded="xl">
        <template #append>
          <V-btn
            variant="plain"
            density="compact"
            icon="mdi-close"
            @click="isActive.value = false"
          />
        </template>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="items"
            disable-sort
            hide-default-footer
          />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
