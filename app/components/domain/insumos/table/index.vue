<script lang="ts" setup>
import Status from "./template/status/index.vue";
import TotalCost from "./template/TotalCost.vue";

defineOptions({
  name: "InsumosTable",
});

const paymentsMethods = ["CCPJ", "CCPJ + MP", "MP", "BOLETO", "DINHEIRO"];
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.status="{ item }">
      <Status
        :text="item.status"
        :id-input-material="item.id"
        @update-status="item.status = $event"
        @update-purchased-by="item.purchased_by = $event"
        @update-purchase-date="item.purchase_date = $event"
        @update-received-date="item.received_date = $event"
      />
    </template>

    <template #item.unit_cost="{ item }">
      <UiToLocaleString :value="item.unit_cost" />
    </template>

    <template #item.total_cost="{ item }">
      <TotalCost
        :id="item.id"
        :total-cost="item.total_cost"
        :quantity-purchase="item.quantity_purchase"
        @update-total-cost="item.total_cost = $event"
        @update-unit-cost="item.unit_cost = $event"
        @update-quantity-purchase="item.quantity_purchase = $event"
      />
    </template>

    <template #item.quantity_purchase="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.quantity_purchase"
        attr="quantity_purchase"
        :vw="5"
        :disabled="item.status === 'COMPRADO' || item.status === 'LIBERADO'"
        @update-text="item.quantity_purchase = $event"
      />
    </template>

    <template #item.supplier="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.supplier"
        attr="supplier"
        :vw="5"
        @update-text="item.supplier = $event"
      />
    </template>

    <template #item.payment_method="{ item }">
      <UiEditDialogObject
        :id="item.id"
        :value="item.payment_method"
        :items="paymentsMethods"
        attr="payment_method"
        @update-text="item.payment_method = $event"
      >
        <template #default="bind">
          <v-btn
            v-if="!item.payment_method"
            v-bind="bind"
            variant="plain"
            block
          />

          <span v-else v-bind="bind">{{ item.payment_method }}</span>
        </template>
      </UiEditDialogObject>
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
  </UiTable>
</template>
