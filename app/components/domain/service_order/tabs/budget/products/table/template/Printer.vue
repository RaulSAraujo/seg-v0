<script lang="ts" setup>
import { useErpTypeApi } from "~/composables/service_order/useErpTypeApi";

defineOptions({
  name: "ServiceOrderBudgetProductsTableTemplatePrinter",
});

const props = defineProps<{
  serviceOrderId: string | number;
  erpReserveId: number | null;
  name: string;
  ean: string;
}>();

const serviceOrderStore = useServiceOrderStore();
const { type } = storeToRefs(serviceOrderStore);

const productStore = useServiceOrderProductsStore();
const { serviceOrderProducts } = storeToRefs(productStore);

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const invoiceStore = useServiceOrderInvoiceStore();
const { invoiceData } = storeToRefs(invoiceStore);

const { $customFetch, $config } = useNuxtApp();

const { data: user } = useAuth();

const { data: erpType } = useErpTypeApi({ lazy: true });

const generatePdf = async () => {
  try {
    const erp = erpType.value?.find((e) => e.TIPOOS == type.value);

    const res = await $customFetch<{ url: string }>(
      "service-order/service-order-products/generate-pdf",
      {
        method: "POST",
        body: {
          content: {
            nOS: props.serviceOrderId,
            nItem: props.erpReserveId ?? 0,
            name: user.value!.name,
            qtdTotalOS: serviceOrderProducts.value.reduce(
              (acc, curr) => acc + curr.quantity,
              0.0
            ),
            tipoGarantiaOS: erp?.DESCRTIPOOS,
            seguradoraOS: invoiceData.value.extended_warranty,
            marcaOS: apparatusData.value.supplier,
            equipOS: apparatusData.value.apparatus,
            fab: props.name,
            bar: props.ean,
          },
        },
      }
    );

    window?.open(`${$config.public.base_url_local}${res.url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-btn
    icon="mdi-printer"
    variant="plain"
    size="small"
    color="green"
    density="comfortable"
    @click="generatePdf"
  />
</template>
