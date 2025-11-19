<script lang="ts" setup>
import { useOSScheduleApi } from "~/services/service_order.service/useServiceOrderScheduleApi";

const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - Agenda - %s`,
});

definePageMeta({
  path: "/ordem-servico/:id/agenda",
});

const { get } = useOSScheduleApi();

const scheduleStore = useServiceOrderScheduleStore();

const { data, status } = get(params.id as string, { lazy: true });

onMounted(() => {
  if (status.value == "success" && data.value) {
    scheduleStore.set(data.value);
  }
});
</script>

<template>
  <div
    v-if="status == 'success'"
    class="border-div-product my-4"
    style="min-height: 220px"
  >
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">EVENTOS</p>

      <ServiceOrderTabsScheduleCreation />
    </div>

    <ServiceOrderTabsScheduleTable />
  </div>
</template>

<style scoped>
.border-div-product {
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
