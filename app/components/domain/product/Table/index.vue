<script lang="ts" setup>
import type { RowWithRelationship } from "~/interfaces/Product";

import { UpdateAll, Integration } from "./bottom_sheet";
import { Pref, Status, Cost, GrossMargin, Price, Name } from "./templates";

defineOptions({
  name: "ProductTable",
});

const emit = defineEmits(["dblclick"]);

const productStore = useProductStore();
const { costTableIndex } = storeToRefs(productStore);

function activateDialogToEdit(item: RowWithRelationship) {
  productStore.setValues(item);
  costTableIndex.value = 0;

  emit("dblclick");
}
</script>

<template>
  <UiTable
    show-select
    multi-sort
    :show-expand="true"
    :others-query="{
      full: true,
    }"
  >
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        density="compact"
        :to="`/produto-compra/${item.id}`"
        @click="productStore.setValues(item)"
      />
    </template>

    <template #item.pref="{ item }">
      <Pref
        :id="item.id"
        :product-id="item.Family.product_id"
        :buy-preference-id="item.Family.buy_preference_id"
      />
    </template>

    <template #item.availability="{ item }">
      <TemplatesAvailability
        :availability="item.availability"
        :pavailability-histories="item.PAvailabilityHistories"
        @dblclick="activateDialogToEdit(item)"
      />
    </template>

    <template #item.pstatuses="{ item }">
      <Status :pstatuses="item.Pstatuses" />
    </template>

    <template #item.name="{ item }">
      <Name :name="item.name" :observation-cod-fab="item.observation_cod_fab" />
    </template>

    <template #item.erp_syncecom="{ item }">
      <UiCheckIcon
        :value="item.ProductSell?.erp_syncecom ?? false"
        :readonly="true"
      />
    </template>

    <template #item.syncedecom="{ item }">
      <UiCheckIcon
        :value="item.ProductSell?.syncedecom ?? false"
        :readonly="true"
      />
    </template>

    <template #item.syncecominprogress="{ item }">
      <UiCheckIcon
        :value="item.ProductSell?.syncecominprogress ?? false"
        :readonly="true"
      />
    </template>

    <template #item.syncecomfailed="{ item }">
      <UiCheckIcon
        :value="item.ProductSell?.syncecomfailed ?? false"
        :readonly="true"
      />
    </template>

    <template #item.quantity="{ item }">
      <span>
        {{
          item.type === "KIT" ? item.ProductSell?.quantity ?? 0 : item.quantity
        }}
      </span>
    </template>

    <template #item.price="{ item }">
      <Price
        :price="item.price"
        :promotion-price="item.promotion_price"
        :promotion-starts-at="item.promotion_starts_at"
        :promotion-ends-at="item.promotion_ends_at"
      />
    </template>

    <template #item.cost="{ item }">
      <Cost :cost="item.cost" :cost-at="item.cost_at" />
    </template>

    <template #item.gross_margin="{ item }">
      <GrossMargin :cost="item.cost" :price="item.price" />
    </template>

    <template #item.price_table_id="{ item }">
      <span>{{ item.TablePrice?.name }}</span>
    </template>

    <template #item.counter_price="{ item }">
      <UiToLocaleString :value="item.counter_price" />
    </template>

    <template #item.promotion_price="{ item }">
      <UiToLocaleString :value="item.promotion_price" />
    </template>

    <template #item.supplier_preference_id="{ item }">
      <span> {{ item.SupplierPreference?.name.toUpperCase() }} </span>
    </template>

    <template #item.package_id="{ item }">
      <span>{{ item.Package?.name }}</span>
    </template>

    <template #item.gross_weight="{ item }">
      <span>{{ Math.ceil(parseFloat(item.gross_weight ?? 0.0) * 1000) }}</span>
    </template>

    <template #item.weight="{ item }">
      <span>{{ Math.ceil(parseFloat(item.weight ?? 0.0) * 1000) }}</span>
    </template>

    <template #item.weight_cubic="{ item }">
      <span>{{ Math.ceil(parseFloat(item.weight_cubic ?? 0.0) * 1000) }}</span>
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <span>{{ item.model }}</span>
        </td>
      </tr>
    </template>

    <template #selection-group-button>
      <UpdateAll />

      <Integration />
    </template>
  </UiTable>
</template>
