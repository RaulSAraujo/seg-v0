<script setup lang="ts">
import type { MarketplaceOrderDelay } from "~/interfaces/ExpeditionDashboard";

defineProps<{
  headers: { title: string; key: string; align?: "start" | "end" | "center" }[];
}>();

const date = ref("");

const marketplaceOrderDelay = ref<MarketplaceOrderDelay[]>([]);

const { $customFetch } = useNuxtApp();

const { databaseDate } = useDateConversion();

const find = async () => {
  try {
    const arrayDate = date.value.split(" - ").map((date) => databaseDate(date));

    const res = await $customFetch<MarketplaceOrderDelay[]>(
      "marketplace-order-delay/order-delays",
      {
        query: {
          date_start: arrayDate[0],
          date_end: arrayDate[1],
        },
      }
    );

    marketplaceOrderDelay.value = res;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

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
  marketplaceOrderDelay.value.reduce<MarketplaceData[]>((acc, e) => {
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

const close = () => {};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="50vw"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-tooltip location="top" text="HISTÓRICO" content-class="bg-primary">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialog)"
            variant="plain"
            density="comfortable"
            icon="mdi-history"
            color="primary"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl" title="HISTÓRICO DE ENVIOS ATRASADOS">
        <template #text>
          <v-row dense>
            <v-col>
              <ExpeditionDashboardDaysOfWeek
                v-model="date"
                @save="date = $event"
              />
            </v-col>

            <v-spacer />

            <v-col cols="2">
              <v-btn
                text="Buscar"
                variant="flat"
                color="primary"
                @click="find"
              />
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="transformOrders"
            disable-sort
            hide-default-footer
            class="my-3 rounded-xl"
            style="min-height: 270px"
          />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
