<script lang="ts" setup>
import Submit from "./Submit.vue";
import Tabs from "./tabs/Index.vue";
import OrderStatus from "./inputs/OrderStatus.vue";
import AttendanceType from "./inputs/AttendanceType.vue";
import ClientInformation from "./client_information/index.vue";

defineOptions({
  name: "CounterOrderCreation",
});

defineProps<{
  title: string;
}>();

const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);
</script>

<template>
  <div class="mx-5">
    <span class="text-h6 text-primary text-uppercase font-weight-black">
      {{ title }}
    </span>

    <v-row dense class="mt-5">
      <v-col cols="3">
        <AttendanceType v-model="form.attendance_type" />
      </v-col>

      <v-col cols="3">
        <OrderStatus v-model="form.status" />
      </v-col>

      <v-col cols="2">
        <UiTextField v-model="form.seller" label="Vendedor" disabled />
      </v-col>

      <v-col cols="2">
        <UiDatePicker
          v-model="form.created_at"
          label="Data criação"
          :multiple="false"
          :clearable="true"
          :disabled="true"
        />
      </v-col>

      <v-col cols="2">
        <UiDatePicker
          v-model="form.delivery_date"
          label="Data entrega"
          :multiple="false"
          :clearable="true"
          :disabled="true"
        />
      </v-col>
    </v-row>

    <v-divider color="primary" :opacity="0.8" class="my-5" />

    <ClientInformation />

    <Tabs />

    <Submit />
  </div>
</template>
