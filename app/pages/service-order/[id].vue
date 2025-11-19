<script lang="ts" setup>
import { useServiceOrderApi } from "~/services/service_order.service/useServiceOrderApi";
import { useServiceOrderEventSource } from "~/composables/service_order/useEventSource";
import { useOSProductsApi } from "~/services/service_order.service/useServiceOrderProductsApi";
import { useOSServicesApi } from "~/services/service_order.service/useServiceOrderServicesApi";

definePageMeta({
  path: "/ordem-servico/:id",
  scrollToTop: false,
});

const { params } = useRoute();

const router = useRouter();

useHead({
  titleTemplate: `Ordem de serviço #${params.id} - %s`,
});

const serviceOrderStore = useServiceOrderStore();
const othersStore = useServiceOrderOthersStore();
const clientStore = useServiceOrderClientStore();
const addressStore = useServiceOrderAddressStore();
const invoiceStore = useServiceOrderInvoiceStore();
const techObsStore = useServiceOrderTechObsStore();
const historyStore = useServiceOrderHistoryStore();
const productsStore = useServiceOrderProductsStore();
const servicesStore = useServiceOrderServicesStore();
const apparatusStore = useServiceOrderApparatusStore();

const { setupEventSource, cleanup, handleBeforeUnload } =
  useServiceOrderEventSource(params.id as string);

const { data, status } = useServiceOrderApi().getById(params.id as string, {
  lazy: true,
});

const { data: products, status: productsStatus } = useOSProductsApi().get(
  params.id as string,
  { lazy: true }
);

const { data: services, status: servicesStatus } = useOSServicesApi().get(
  params.id as string,
  { lazy: true }
);

watch(
  () => status.value,
  () => {
    if (status.value === "success" && data.value) {
      clientStore.set(data.value.Client);
      serviceOrderStore.loadingProps(data.value);
      addressStore.set(data.value.Client.ClientsAddresses);

      Object.entries(data.value).forEach(([key, value]) => {
        invoiceStore.set(key, value);
        othersStore.set(key, value);
        apparatusStore.set(key, value);
      });
    }

    if (status.value === "error") {
      router.push({ name: "service-order" });
    }
  }
);

watch(
  () => productsStatus.value,
  () => {
    if (productsStatus.value === "success" && products.value) {
      productsStore.set(products.value);
    }
  }
);

watch(
  () => servicesStatus.value,
  () => {
    if (servicesStatus.value === "success" && services.value) {
      servicesStore.set(services.value);
    }
  }
);

onMounted(async () => {
  setupEventSource();

  window.addEventListener("beforeunload", handleBeforeUnload);

  if (status.value === "success" && data.value) {
    clientStore.set(data.value.Client);
    serviceOrderStore.loadingProps(data.value);
    addressStore.set(data.value.Client.ClientsAddresses);

    Object.entries(data.value).forEach(([key, value]) => {
      invoiceStore.set(key, value);
      othersStore.set(key, value);
      apparatusStore.set(key, value);
    });
  }

  if (productsStatus.value === "success" && products.value) {
    productsStore.set(products.value);
  }

  if (servicesStatus.value === "success" && services.value) {
    servicesStore.set(services.value);
  }

  const rows = await useServiceOrderApi().fetchHistory(params.id as string);

  historyStore.set(rows);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);

  clientStore.clear();
  othersStore.clear();
  addressStore.clear();
  techObsStore.clear();
  invoiceStore.clear();
  historyStore.clear();
  servicesStore.clear();
  productsStore.clear();
  apparatusStore.clear();
  serviceOrderStore.clear();
});

onBeforeRouteLeave(async (to, from, next) => {
  cleanup();

  if (
    to.name == "service-order" ||
    to.name == "service-order-id"
  ) {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para ordem de serviço"
        :to="{
          name: 'service-order',
        }"
      />

      <v-spacer />
    </div>

    <v-sheet class="mx-2 mt-2" rounded="xl" elevation="5">
      <ServiceOrderForms :id="(params.id as string)" />

      <ServiceOrderGroupButton />

      <v-divider color="primary" opacity="0.8" />

      <div class="px-2">
        <NuxtPage />
      </div>

      <ServiceOrderToolbar />
    </v-sheet>

    <ServiceOrderFloating />

    <ServiceOrderTimeActive />
  </div>
</template>
