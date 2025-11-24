<script lang="ts" setup>
import Status from "./Status.vue";
import Metrics from "./metrics/Index.vue";
import Products from "./products/Index.vue";
import FormsOfPayment from "./forms_of_payment/Index.vue";

defineOptions({
  name: "CounterOrderTabsBudget",
});
</script>

<template>
  <div>
    <Products />

    <v-row dense class="my-5">
      <v-col cols="6">
        <FormsOfPayment />
      </v-col>

      <v-col cols="6">
        <Status />
      </v-col>
    </v-row>

    <Metrics />
  </div>
</template>
