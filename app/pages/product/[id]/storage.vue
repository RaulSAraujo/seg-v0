<script setup lang="ts">
import type {
  Product,
  PreferentialWarehouse,
  WarehousesAddresses,
} from "~/interfaces/Product";
import type { ERPWarehouses } from "~/interfaces/ErpWarehouses";

definePageMeta({
  path: "/produto-compra/:id/armazenagem",
});

const { params } = useRoute();

interface Warehouse {
  PreferentialWarehouse: PreferentialWarehouse | null;
  WarehousesAddresses: WarehousesAddresses[];
}

const [warehousesRes, erpWarehousesRes] = await Promise.all([
  $api<Warehouse>("product", {
    query: {
      id: params.id,
      warehouses: true,
    },
  }).then((fetchedData) => {
    const firstRow = (fetchedData as unknown as Product).rows[0];

    return {
      PreferentialWarehouse: firstRow?.PreferentialWarehouse || null,
      WarehousesAddresses: firstRow?.WarehousesAddresses || [],
    };
  }),

  $api<ERPWarehouses>(`product/erp-warehouse`).then((data) => data.rows),
]);

const preferentialWarehouse =
  warehousesRes?.PreferentialWarehouse ?? null;
const warehousesAddresses = warehousesRes?.WarehousesAddresses ?? [];
const erpWarehouses = erpWarehousesRes ?? [];
</script>

<template>
  <v-sheet rounded="xl">
    <v-toolbar title="ARMAZENAGEM PREFERENCIAL" rounded="t-xl" />

    <ProductStoragePreferentialStorage
      :preferential-warehouse="preferentialWarehouse"
      :erp-warehouses="erpWarehouses"
    />

    <v-toolbar title="LOCAIS DE ARMAZENAGEM" />

    <ProductStorageTable
      :warehouses-addresses="warehousesAddresses"
      :erp-warehouses="erpWarehouses"
    />
  </v-sheet>
</template>
