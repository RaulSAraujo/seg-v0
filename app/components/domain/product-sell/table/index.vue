<script lang="ts" setup>
import BuyPreferenceId from "./templates/BuyPreferenceId.vue";

defineOptions({
  name: "ProductSellTable",
});

const productSellStore = useProductSellStore();
</script>

<template>
  <UiTable :show-select="true" :multi-sort="true" :show-expand="true">
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        :to="{
          name: 'product-sell-id',
          params: { id: item.id },
        }"
        @click="productSellStore.setProduct(item)"
      />
    </template>

    <template #item.availability="{ item }">
      <TemplatesAvailability
        :availability="item.Family?.SellPreference?.availability"
        :pavailability-histories="
          item.Family?.SellPreference?.PAvailabilityHistories
        "
      />
    </template>

    <template #item.Det="{ item }">
      <BuyPreferenceId
        :products="item.Family.Products"
        :buy-preference-id="item.Family.buy_preference_id"
      />
    </template>

    <template #item.CategoryEcom="{ props: { item } }">
      <span>{{ item.CategoryEcom?.category_name }}</span>
    </template>

    <template #item.counter_price="{ item }">
      <UiToLocaleString
        :value="item.Family?.SellPreference?.counter_price ?? 0"
      />
    </template>

    <template #item.sell_price="{ item }">
      <UiToLocaleString
        :value="
          item.Kit ? item.Kit?.Products[0]?.price ?? 0 : item.sell_price ?? 0
        "
      />
    </template>

    <template #item.brand="{ item }">
      <span>{{ item.Family?.SellPreference?.brand }}</span>
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <span>{{ item.model }}</span>
        </td>
      </tr>
    </template>
  </UiTable>
</template>
