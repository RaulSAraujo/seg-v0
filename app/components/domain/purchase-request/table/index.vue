<script lang="ts" setup>
import Tray from "./template/Tray.vue";
import Status from "./template/Status.vue";
import TotalCost from "./selection_text/TotalCost.vue";
import TotalItems from "./selection_text/TotalItems.vue";
import UpdateSelected from "./update_selected/index.vue";

defineOptions({
  name: "PurchaseRequestTable",
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }">
      <div class="d-flex">
        <Tray :sale-id="item.reservation" />

        <UiDelete :id="item.id" />
      </div>
    </template>

    <template #item.reservation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.reservation ?? ''"
        :vw="5"
        attr="reservation"
        @update-text="item.reservation = $event"
      />
    </template>

    <template #item.quantity_purchased="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.quantity_purchased"
        attr="quantity_purchased"
        @update-text="item.quantity_purchased = $event"
      />
    </template>

    <template #item.quantity_reserved="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.quantity_reserved"
        attr="quantity_reserved"
        @update-text="item.quantity_reserved = $event"
      />
    </template>

    <template #item.cost="{ item }">
      <UiEditDialogCurrency
        :id="item.id"
        :value="item.cost"
        attr="cost"
        @update-text="item.cost = `${$event}`"
      />
    </template>

    <template #item.status="{ item }">
      <Status
        :id="item.id"
        :status="item.status"
        @update-text="item.status = $event"
      />
    </template>

    <template #item.sending_limit_at="{ item }">
      <UiEditDialogDate
        :id="item.id"
        :date="item.sending_limit_at ?? ''"
        attr="sending_limit_at"
        :clearable="true"
        @update-text="item.sending_limit_at = $event"
      />
    </template>

    <template #item.observation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation ?? ''"
        :vw="3"
        attr="observation"
        @update-text="item.observation = $event"
      />
    </template>

    <template #selection-text>
      <v-divider vertical class="mx-2" />
      <TotalItems />
      <v-divider vertical class="mx-2" />
      <TotalCost />
    </template>

    <template #selection-group-button>
      <UpdateSelected />
    </template>
  </UiTable>
</template>
