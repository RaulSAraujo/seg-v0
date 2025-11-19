<script lang="ts" setup>
import DiffFreight from "./selection_text/DiffFreight.vue";
import TotalInvoice from "./selection_text/TotalInvoice.vue";
import ImportedInvoices from "./templates/ImportedInvoices.vue";

defineOptions({
  name: "ShippingValidationTable",
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.shipping_validated="{ item }">
      <UiCheckIcon
        :id="item.id"
        :enable-alert="true"
        :value="item.shipping_validated"
        attr="shipping_validated"
        @update-value="item.shipping_validated = $event"
      />
    </template>

    <template #item.tags="{ item }">
      <TemplatesTags :tags="item.tags ?? []" />
    </template>

    <template #item.actual_freight_price="{ item }">
      <UiToLocaleString :value="item.actual_freight_price" />
    </template>

    <template #item.bill_freight_price="{ item }">
      <UiEditDialogCurrency
        :id="item.id"
        :value="item.bill_freight_price"
        attr="bill_freight_price"
        @update-text="item.bill_freight_price = $event"
      />
    </template>

    <template #item.customer_freight_price="{ item }">
      <UiToLocaleString :value="item.customer_freight_price" />
    </template>

    <template #item.freight_diff_price="{ item }">
      <UiToLocaleString :value="item.freight_diff_price" />
    </template>

    <template #item.freight_comment="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.freight_comment ?? ''"
        attr="freight_comment"
        :vw="5"
        @update-text="item.freight_comment = $event"
      />
    </template>

    <template #item.observation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation"
        attr="observation"
        :vw="5"
        @update-text="item.observation = $event"
      />
    </template>

    <template #item.date="{ item }">
      <UiDateString :date="item.Order.date" />
    </template>

    <template #item.sending_date="{ item }">
      <UiDateString :date="item.Order.sending_date" />
    </template>

    <template #item.status="{ item }">
      <UiTooltip :text="item.Order.status" :vw="4" />
    </template>

    <template #item.marketplace_seller_name="{ item }">
      <UiTooltip :text="item.Order.marketplace_seller_name" :vw="5" />
    </template>

    <template #item.shipment="{ item }">
      <UiTooltip :text="item.Order.shipment" :vw="4" />
    </template>

    <template #item.shipment_integrator="{ item }">
      <UiTooltip :text="item.Order.shipment_integrator" :vw="4" />
    </template>

    <template #item.point_sale="{ item }">
      <UiTooltip :text="item.Order.point_sale" :vw="5" />
    </template>

    <template #item.invoice_number="{ item }">
      <span>{{ item.Order.invoice_number }}</span>
    </template>

    <template #item.company_name="{ item }">
      <UiTooltip :text="item.Customer?.company_name ?? ''" :vw="5" />
    </template>

    <template #item.cpf="{ item }">
      <UiTooltip :text="item.Customer?.cnpj || item.Customer?.cpf" :vw="5" />
    </template>

    <template #item.sending_code="{ item }">
      <UiTooltip :text="item.Order?.sending_code" :vw="5" />
    </template>

    <template #item.seller="{ item }">
      <UiTooltip :text="item.Order?.seller" :vw="5" />
    </template>

    <template #item.shipping_volume="{ item }">
      <span> {{ item.shipping_volume }} </span>
    </template>

    <template #item.email="{ item }">
      <UiTooltip :text="item.Customer?.email ?? ''" :vw="5" />
    </template>

    <template #item.name="{ item }">
      <UiTooltip :text="item.Customer?.name ?? ''" :vw="5" />
    </template>

    <template #item.total="{ item }">
      <UiToLocaleString :value="item.Order.total" />
    </template>

    <template #item.delivery_time="{ item }">
      <span v-if="item.Order.delivery_time">{{
        item.Order.delivery_time
      }}</span>
    </template>

    <template #item.shipment_value="{ item }">
      <UiToLocaleString :value="item.Order?.shipment_value ?? 0" />
    </template>

    <template #item.shipping_finished="{ item }">
      <UiCheckIcon
        :id="item.id"
        :enable-alert="true"
        :value="item.shipping_finished"
        attr="shipping_finished"
        :body="{
          ecom_order_id: item.ecom_order_id,
        }"
        :readonly="item.shipping_finished"
        @update-value="
          item.shipping_finished = $event;
          item.Order.status = 'FINALIZADO';
        "
      />
    </template>

    <template #item.imported_invoices="{ item }">
      <ImportedInvoices :imported-invoices="item.imported_invoices" />
    </template>

    <template #selection-text>
      <v-divider vertical class="mx-2" />
      <DiffFreight />
      <v-divider vertical class="mx-2" />
      <TotalInvoice />
    </template>
  </UiTable>
</template>
