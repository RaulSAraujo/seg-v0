<script lang="ts" setup>
import {
  Name,
  City,
  State,
  Status,
  Number,
  CpfCnpj,
  Number1,
  Address,
  Cep,
  SaleDate,
  Neighborhood,
} from "./input";
import ClientNew from "./button_clients/New.vue";
import ClientEdit from "./button_clients/edit/index.vue";
import CustomerHistory from "./customer_history/Index.vue";

defineOptions({
  name: "SacInformation",
});
</script>

<template>
  <div>
    <v-row dense justify="space-between" class="px-3 my-2">
      <v-col cols="3">
        <Name />
      </v-col>

      <v-col cols="3">
        <CpfCnpj />
      </v-col>

      <v-col cols="2">
        <Number1 />
      </v-col>

      <v-col cols="2" class="d-flex justify-center">
        <CustomerHistory />
      </v-col>

      <v-col cols="2">
        <SaleDate />
      </v-col>

      <v-col cols="2">
        <Address />
      </v-col>

      <v-col cols="1">
        <Number />
      </v-col>

      <v-col cols="2">
        <Neighborhood />
      </v-col>

      <v-col cols="2">
        <City />
      </v-col>

      <v-col cols="2">
        <Cep />
      </v-col>

      <v-col cols="1">
        <State />
      </v-col>

      <v-col cols="2">
        <Status />
      </v-col>
    </v-row>

    <div class="d-flex justify-end mt-2">
      <ClientEdit />

      <ClientNew />
    </div>
  </div>
</template>
