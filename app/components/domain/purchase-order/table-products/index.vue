<script setup lang="ts">
import {
  EquivalentName,
  Invoice,
  InvoiceCost,
  ObservationProduct,
  QuantityReserved,
  Reservation,
  SendingLimitAt,
  Status,
  StatusLimitChip,
  Partial,
} from "./template";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  index: number;
  cpuUsage: number;
  items: Row[];
}>();

defineEmits(["add", "destroy"]);

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const purchaseOrderStore = usePurchaseOrderStore();
const { statusLimit } = storeToRefs(purchaseOrderStore);

interface Headers {
  title: string;
  key: string;
  width?: number | string;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "NF", key: "invoice" },
  { title: "Cód. fabricante", key: "name" },
  { title: "Cód. equivalente", key: "equivalent_name" },
  { title: "Cód. auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  {
    title: "Quant. comprada",
    key: "quantity_purchased",
    align: "center",
    width: 80,
  },
  {
    title: "Quant. reservada",
    key: "quantity_reserved",
    align: "center",
    width: 80,
  },
  { title: "Finalidade", key: "reservation" },
  { title: "Data limite", key: "sending_limit_at" },
  { title: "Parcial", key: "partial", align: "center" },
  { title: "Situação liberação", key: "status", align: "center" },
  { title: "Data recebimento", key: "receiving_at", align: "center" },
  { title: "Obs", key: "observation_product" },
  { title: "R$ nota", key: "invoice_cost" },
  { title: "R$ forn.", key: "supplier_cost" },
  { title: "R$ seg", key: "seg_cost" },
  { title: "R$ compra", key: "purchase_cost" },
  { title: "Total", key: "total_custo_seg" },
]);

// Estado para controlar quantos itens serão exibidos
const displayedItemCount = ref(1);

// Função para obter os itens exibidos
const itemsCurrent = computed(() => {
  const slice = [...props.items].slice(0, displayedItemCount.value);

  return slice;
});

const loadingProgress = ref(5);

// Incrementar o número de itens exibidos a cada intervalo
const { isActive, pause } = useIntervalFn(() => {
  if (displayedItemCount.value < props.items.length) {
    if (props.cpuUsage > 20) return;

    const loadFactor = props.cpuUsage / 100;
    const maxItemsToAdd = 20;
    const itemsToAdd = Math.max(
      1,
      Math.floor(maxItemsToAdd * (1 - loadFactor))
    );

    displayedItemCount.value += itemsToAdd;
    loadingProgress.value =
      (displayedItemCount.value / props.items.length) * 100;
  } else {
    pause();
  }
}, (props.index == 0 ? 0.5 : props.index) * 100);

const updateItem = (item: Row, newItem: Row) => {
  Object.entries(newItem).forEach(([key, value]) => {
    if (key in item) {
      (item as unknown as Record<string, unknown>)[key] = value;
    }
  });
};

const block = (event: { index: number; value: boolean }) => {
  const { index, value } = event;

  if (!itemsCurrent.value[index]) return;

  itemsCurrent.value[index].block = value;
};

// Adicionar nova coluna status limite
if (statusLimit.value == true) {
  headers.value.splice(11, 0, {
    title: "Status limite",
    key: "status_limit",
    align: "center",
  });
} else {
  const index = headers.value.findIndex((e) => e.key == "status_limit");

  if (index != -1) {
    headers.value.splice(index, 1);
  }
}
</script>

<template>
  <div>
    <v-progress-linear
      v-if="isActive"
      v-model="loadingProgress"
      color="primary"
    />

    <v-data-table
      v-model="selected"
      density="compact"
      :headers="headers"
      items-per-page="-1"
      :show-select="true"
      :items="itemsCurrent"
      :disable-sort="true"
      :return-object="true"
      :hide-default-footer="true"
    >
      <template #item.invoice="{ item }">
        <Invoice :item="item" />
      </template>

      <template #item.name="{ item }">
        <span class="text-truncate">{{ item.name }}</span>
      </template>

      <template #item.equivalent_name="{ item }">
        <EquivalentName :item="item" />
      </template>

      <template #item.description="{ item }">
        <UiTooltip :text="item.description" :vw="3" />
      </template>

      <template #item.quantity_reserved="{ item }">
        <QuantityReserved :item="item" />
      </template>

      <template #item.sending_limit_at="{ item }">
        <SendingLimitAt :item="item" />
      </template>

      <template #item.reservation="{ item }">
        <Reservation :item="item" />
      </template>

      <template #item.status="{ item }">
        <Status :item="item" />
      </template>

      <template #item.receiving_at="{ item }">
        <UiDateString
          v-if="item.receiving_at"
          :date="item.receiving_at"
          format-for="DD/MM/YYYY HH:mm:ss"
          format-from="YYYY-MM-DD HH:mm:ss"
        />
      </template>

      <template #item.partial="{ item }">
        <Partial
          :item="item"
          :products="items"
          @block="block($event)"
          @update="updateItem(item, $event)"
          @add="$emit('add', $event)"
          @destroy="$emit('destroy', $event)"
        />
      </template>

      <template #item.observation_product="{ item }">
        <ObservationProduct :item="item" />
      </template>

      <template #item.invoice_cost="{ item }">
        <InvoiceCost :item="item" />
      </template>

      <template #item.supplier_cost="{ item }">
        <UiToLocaleString :value="item.supplier_cost" />
      </template>

      <template #item.seg_cost="{ item }">
        <UiToLocaleString :value="item.seg_cost" />
      </template>

      <template #item.purchase_cost="{ item }">
        <UiToLocaleString :value="item.purchase_cost" />
      </template>

      <template #item.total_custo_seg="{ item }">
        <UiToLocaleString
          :value="parseFloat(item.purchase_cost) * item.quantity_purchased"
        />
      </template>

      <template #item.status_limit="{ item }">
        <StatusLimitChip
          v-if="item.status_limit"
          :status-limit="item.status_limit ?? ''"
        />
      </template>
    </v-data-table>
  </div>
</template>
