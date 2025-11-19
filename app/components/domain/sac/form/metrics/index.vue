<script lang="ts" setup>
import ToPay from "./ToPay.vue";
import Freight from "./Freight.vue";
import PaymentType from "./PaymentType.vue";
import QuoteFreight from "./QuoteFreight.vue";
import TotalProducts from "./TotalProducts.vue";
import DiscountFreight from "./DiscountFreight.vue";
import DiscountProducts from "./DiscountProducts.vue";
import NegotiationLimit from "./negotiation_limit/index.vue";
import TotalWithShipping from "./TotalWithShipping.vue";
import TotalWithoutShipping from "./TotalWithoutShipping.vue";
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <TotalProducts />

      <PaymentType />
    </div>

    <NegotiationLimit />

    <QuoteFreight />

    <div class="d-flex align-center justify-space-between mt-4">
      <ClientOnly>
        <Freight />

        <template #fallback>
          <v-skeleton-loader width="250px" color="transparent" type="heading" />
        </template>
      </ClientOnly>

      <DiscountFreight />

      <ToPay />
    </div>

    <DiscountProducts />

    <TotalWithoutShipping />

    <TotalWithShipping />
  </div>
</template>
