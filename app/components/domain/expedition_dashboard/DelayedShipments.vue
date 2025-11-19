<script lang="ts" setup>
import type { MarketplaceOrderDelay } from "~/interfaces/ExpeditionDashboard";

const props = defineProps<{
  marketplaceOrderDelay: MarketplaceOrderDelay[];
}>();

const mapWeekday = (
  value: number
): keyof Omit<MarketplaceData, "marketplace"> | undefined => {
  if (value == 2) return "monday";
  if (value == 3) return "tuesday";
  if (value == 4) return "wednesday";
  if (value == 5) return "thursday";
  if (value == 6) return "friday";
  if (value == 7) return "saturday";
  return undefined;
};

interface MarketplaceData {
  marketplace: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}

const transformOrders = computed(() =>
  props.marketplaceOrderDelay.reduce<MarketplaceData[]>((acc, e) => {
    let group = acc.find((item) => item.marketplace === e.marketplace);

    if (!group) {
      group = {
        marketplace: e.marketplace,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
      };

      acc.push(group);
    }

    const weekday = mapWeekday(e.weekday);
    if (weekday) {
      group[weekday] += e.count;
    }

    return acc;
  }, [])
);

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Loja", key: "marketplace" },
  { title: "Segunda", key: "monday", align: "center" },
  { title: "Terça", key: "tuesday", align: "center" },
  { title: "Quarta", key: "wednesday", align: "center" },
  { title: "Quinta", key: "thursday", align: "center" },
  { title: "Sexta", key: "friday", align: "center" },
  { title: "Sábado", key: "saturday", align: "center" },
];
</script>

<template>
  <div class="d-flex align-center justify-space-between">
    <span class="text-h4 text-primary font-weight-black">ENVIOS ATRASADOS</span>

    <ExpeditionDashboardHistoryDelayedShipment :headers="headers" />
  </div>

  <v-data-table
    :headers="headers"
    :items="transformOrders"
    disable-sort
    hide-default-footer
    class="my-3 rounded-xl text-h5"
    style="min-height: 270px"
  />
</template>
