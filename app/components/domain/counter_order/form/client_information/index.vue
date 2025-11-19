<script lang="ts" setup>
import {
  Name,
  FlagClient,
  CpfCnpj,
  Number1,
  Number2,
  Number3,
  Street,
  Number,
  Neighborhood,
  City,
  State,
  LocationMaps,
  Observation,
  Cep
} from "./input";
import New from "./button_clients/New.vue";
import Edit from "./button_clients/Edit.vue";

defineOptions({
  name: "ClientInformation",
});
</script>

<template>
  <v-row dense justify="space-between" class="my-2">
    <v-col cols="3">
      <div class="d-flex">
        <Name />

        <FlagClient />
      </div>
    </v-col>

    <v-col cols="3">
      <CpfCnpj />
    </v-col>

    <v-col cols="2">
      <Number1 />
    </v-col>

    <v-col cols="2">
      <Number2 />
    </v-col>

    <v-col cols="2">
      <Number3 />
    </v-col>

    <v-col cols="2">
      <Street />
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
      <LocationMaps />
    </v-col>

    <v-col cols="12">
      <Observation />
    </v-col>
  </v-row>

  <div class="d-flex justify-end mt-2">
    <Edit />

    <New />
  </div>
</template>
