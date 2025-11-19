<script lang="ts" setup>
import type {
  Dashboard,
  AllOrder,
  MarketplaceOrderDelay,
  UserRanking,
  WeeklyPerformance,
} from "~/interfaces/ExpeditionDashboard";

useHead({
  titleTemplate: `Dashboard - %s`,
});

definePageMeta({
  path: "/dashboard",
});

const allOrders = ref<AllOrder[]>([]);

const delayedOrders = ref<number>(0);

const delayedSaleIds = ref<number[]>([]);

const priorityOrders = ref<number>(0);

const prioritySaleIds = ref<number[]>([]);

const marketplaceOrderDelay = ref<MarketplaceOrderDelay[]>([]);

const userRanking = ref<UserRanking[]>([]);

const weeklyPerformance = ref<WeeklyPerformance[]>([]);

if (import.meta.client) {
  onBeforeUnmount(() => {
    eventSource.close();
  });

  const { token } = useAuth();

  const req = useRequestHeaders(["host"]);

  const host = req.host || window.location.hostname;

  let baseURL = useNuxtApp().$config.public.base_url_local as string;
  if (host.includes("ddns")) {
    baseURL = useNuxtApp().$config.public.base_url_external as string;
  }

  const dayjs = useDayjs();

  const dateNow = dayjs().format("YYYY/MM/DD");

  const eventSource = new EventSource(
    `${baseURL}/dashboard?authorization=${token.value}&date_start=${dateNow}&date_end=${dateNow}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data) as Dashboard;

    delayedOrders.value = parseInt(data.delayed_and_priority_orders.delayed);

    delayedSaleIds.value = data.delayed_and_priority_orders.delayed_sale_ids;

    priorityOrders.value = parseInt(data.delayed_and_priority_orders.priority);

    prioritySaleIds.value = data.delayed_and_priority_orders.priority_sale_ids;

    allOrders.value = data.all_orders;

    marketplaceOrderDelay.value = data.marketplace_order_delays;

    userRanking.value = data.user_ranking;

    weeklyPerformance.value = data.weekly_performance;
  };

  eventSource.onerror = () => {
    eventSource.close();
  };
}
</script>

<template>
  <div class="mt-5 mx-16">
    <ExpeditionDashboardOrdersByStatus :all-orders="allOrders" />

    <v-row>
      <v-col cols="8">
        <ExpeditionDashboardSummaryPerUser :user-ranking="userRanking" />

        <ExpeditionDashboardDelayedShipments
          :marketplace-order-delay="marketplaceOrderDelay"
        />
      </v-col>

      <v-col cols="4">
        <v-row justify="center">
          <v-col cols="5">
            <ExpeditionDashboardDelayed
              :delayed-orders="delayedOrders"
              :delayed-sale-ids="delayedSaleIds"
            />
          </v-col>

          <v-col cols="5">
            <ExpeditionDashboardPriority
              :priority-orders="priorityOrders"
              :priority-sale-ids="prioritySaleIds"
            />
          </v-col>
        </v-row>

        <ExpeditionDashboardWeeklyPerformance
          :weekly-performance="weeklyPerformance"
        />
      </v-col>
    </v-row>
  </div>
</template>
