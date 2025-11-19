<script setup lang="ts">
import type { Row } from "~/interfaces/SalesOrder";
import type {
  Checkout,
  ListProductsOrder,
} from "~/interfaces/Checkout";

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

useHead({
  titleTemplate: `Checkout - %s`,
});

definePageMeta({
  path: "/checkout",
});

const handleBeforeUnload = () => {
  if (dialog.value == true) {
    checkOutStore.eventInterruptedFlow();
  }
};

const { $config, $dayjs } = useNuxtApp();

const checkOutStore = useCheckOutStore();
const { dialog } = storeToRefs(checkOutStore);

const inputSaleId = useState<HTMLInputElement | null>(
  "InputSaleId",
  () => null
);

const { data: user } = useAuth();

const { brDateWithTime } = useDateConversion();

const loading = useLoadingIndicator();

useWebSocket(
  `${$config.public.base_url_web_socket}?user_id=${user.value?.id}&group_id=${user.value?.groupId}`,
  {
    autoReconnect: true,
    onMessage(ws, event) {
      const json = JSON.parse(event.data) as { event: string; data: object };

      if (json.event == "Alert") {
        const data = json.data as { message: string; priority: string };

        checkOutStore.eventAlert(data);

        if (
          data.message.includes("Fluxo Finalizado") ||
          data.message.includes("Pedido concluído com sucesso!")
        ) {
          loading.finish();
        }
      }

      if (json.event == "ProductCountData") {
        const data = json.data as Checkout;

        checkOutStore.eventProductCountData(data);

        loading.finish();
      }

      if (json.event == "AccountedProduct") {
        const data = json.data as ListProductsOrder;

        checkOutStore.eventAccountedProduct(data);
      }

      if (json.event == "OrderHistoryData") {
        const data = json.data as Row;

        if (Object.keys(data).length == 0) return;

        checkOutStore.eventHistory(data);
      }

      if (json.event == "FinishedCount") {
        if (!loading.isLoading.value) {
          loading.start();
        }

        dialog.value = false;

        setTimeout(() => {
          inputSaleId.value!.focus();
        }, 500);
      }
    },
  }
);
</script>

<template>
  <div class="mt-5">
    <v-row dense align="center" justify="space-between">
      <v-col cols="2">
        <span class="ml-5 text-h6 text-primary">CHECKOUT</span>
      </v-col>

      <v-col cols="7">
        <ClientOnly>
          <CheckOutStatus />

          <template #fallback>
            <v-row dense justify="space-between" align="center">
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
              <v-col>
                <v-skeleton-loader color="transparent" type="heading" />
              </v-col>
            </v-row>
          </template>
        </ClientOnly>
      </v-col>
    </v-row>

    <UiFilter hide-excel>
      <template #menu>
        <CheckOutUserAnalysis />

        <CheckOutUploadFiles />
      </template>

      <template #button-create>
        <div class="d-flex">
          <CheckOutInput />

          <CheckOutSwitch />
        </div>

        <v-spacer />
      </template>
    </UiFilter>

    <UiTable
      multi-sort
      :others-query="{
        user: user?.name,
        created_at: $dayjs().format('YYYY-MM-DD'),
      }"
    >
      <template #item.actions="{ item }">
        <div class="d-flex">
          <CheckOutTemplatePrintLabel :sale-id="item.sale_id" />

          <CheckOutTemplatePrintInvoice :sale-id="item.sale_id" />

          <CheckOutTemplateSyncTaxData :sale-id="item.sale_id" />
        </div>
      </template>

      <template #item.images="{ item }">
        <LazyCheckOutTemplateImages :sale-id="item.sale_id" />
      </template>

      <template #item.tag_id="{ item }">
        <TemplatesTags :tags="item.tag_id ?? []" />
      </template>

      <template #item.finalized_freight_invoice="{ item }">
        <UiToLocaleString :value="item.finalized_freight_invoice" />
      </template>

      <template #item.freight_invoice="{ item }">
        <UiToLocaleString :value="item.freight_invoice" />
      </template>

      <template #item.freight_quotation="{ item }">
        <UiToLocaleString :value="item.freight_quotation" />
      </template>

      <template #item.freight_value_validation="{ item }">
        <UiToLocaleString :value="item.freight_value_validation" />
      </template>

      <template #item.created_at="{ item }">
        <span>{{ brDateWithTime(item.created_at) }}</span>
      </template>

      <template #item.sale_id="{ item }">
        <CheckOutTemplateTray
          :sale-id="`${item.sale_id}`"
          :poin-sale="item.poin_sale"
        />
      </template>

      <template #item.canceled="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.canceled"
          attr="canceled"
          :url="`sales-order/status-cancel-order`"
          :body="{
            ecom_order_id: item.sale_id,
          }"
          @update-value="item.canceled = $event"
        />
      </template>

      <template #item.collected="{ item }">
        <CheckOutTemplateCollected
          :ecom-order-id="item.sale_id"
          :value="item.collected"
          @update="item.collected = $event"
        />
      </template>
    </UiTable>

    <CheckOutCountProducts />
  </div>
</template>
