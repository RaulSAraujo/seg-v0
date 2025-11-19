<script lang="ts" setup>
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";

const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - CRM - %s`,
});

const { get } = useOSInternalObsApi();

const internalObsStore = useServiceOrderInternalObsStore();

const { data, status } = get(params.id as string, { lazy: true });

onMounted(() => {
  if (status.value == "success" && data.value) {
    internalObsStore.set(data.value);
  }
});
</script>

<template>
  <div class="border-div my-4" style="min-height: 220px">
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">EVENTOS</p>

      <ServiceOrderTabsCrmCreation />
    </div>

    <ServiceOrderTabsCrmTable />
  </div>
</template>

<style scoped>
.border-div {
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
