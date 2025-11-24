<script setup lang="ts">
import type { Row, SacSaleShipment } from "~/interfaces/SacSale";

const props = defineProps<{
  methodRest: "POST" | "PUT";
}>();

const dayjs = useDayjs();
const router = useRouter();
const { params } = useRoute();
const { $customFetch } = useNuxtApp();
const loading = useLoadingIndicator();
const { isDate, databaseDate } = useDateConversion();

const sacStore = useSacStore();
const { seller, saleDate, status, observation, paymentType } =
  storeToRefs(sacStore);

const sacCustomerStore = useSacCustomerStore();
const { customerData } = storeToRefs(sacCustomerStore);

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);

const sacProductsStore = useSacProductsStore();
const { products } = storeToRefs(sacProductsStore);

const sacQuoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacQuoteFreightStore);

const sacMetricsStore = useSacMetricsStore();
const {
  negotiationLimit,
  totalWithoutShipping,
  totalWithShipping,
  discountShipment,
  toPay,
  discountProduct,
  discountProductPercent,
} = storeToRefs(sacMetricsStore);

const save = async () => {
  loading.start();

  let newDate: string | Date | null = saleDate.value;
  if (isDate(`${newDate}`)) {
    newDate = databaseDate(`${newDate}`);
  } else {
    newDate = null;
  }

  const newQuoteFreight = { ...quoteFreight.value } as Partial<SacSaleShipment>;

  if (quoteFreight.value.discount_total == null) {
    quoteFreight.value.discount_total = "0.0";
  }

  if (quoteFreight.value.remaining_quantity == null) {
    quoteFreight.value.remaining_quantity = "0.0";
  }

  delete newQuoteFreight.discount_total;
  delete newQuoteFreight.remaining_quantity;

  try {
    const res = await $customFetch<{ result: Row[] } | Row>("sac-sale", {
      method: props.methodRest,
      body: {
        id: props.methodRest == "PUT" ? params.id : undefined,
        customer_id: customerData.value.id,
        seller: seller.value,
        sale_date: newDate ?? dayjs().toISOString(),
        products: products.value,
        status: status.value,
        observation: observation.value,
        payment_type: paymentType.value,
        discount_percentage: discountProductPercent.value,
        discount_total: parseFloat(discountProduct.value?.toFixed(2) ?? "0.0"),
        negotiation_limit: parseFloat(negotiationLimit.value.toFixed(2)),
        sub_total: parseFloat(totalWithoutShipping.value.toFixed(2)),
        total: parseFloat(totalWithShipping.value.toFixed(2)),
        shipment: {
          ...newQuoteFreight,
          discount_total: discountShipment.value ?? 0,
          remaining_quantity: toPay.value,
          zip_code: addressData.value.zip_code,
        },
      },
    });

    if (props.methodRest == "POST") {
      router.back();
    }

    loading.finish();

    setTimeout(() => {
      let row: Row;
      if (props.methodRest == "POST") {
        row = res as Row;
      } else {
        row = (res as { result: Row[] }).result[0] ?? ({} as Row);
      }

      if (row.status == "VALIDAR" && status.value != "VALIDAR") {
        $toast().warning("Cotação enviada para validação.");
      }

      $toast().success(
        props.methodRest == "POST"
          ? "Venda criada com sucesso."
          : "Venda atualizada com sucesso."
      );

      if (props.methodRest == "PUT") {
        status.value = row.status;
      }
    }, 200);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <ClientOnly>
    <v-fab
      icon="mdi-content-save"
      color="primary"
      class="button"
      style="position: fixed; bottom: 30px; right: 15px"
      @click="save"
    />
  </ClientOnly>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
