<script lang="ts" setup></script>

<template>
  <v-row dense>
    <v-col cols="4">
      <div class="d-flex">
        <ServiceOrderInputName readonly />

        <ServiceOrderInputFlagClient disabled />
      </div>
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputCpfCnpj readonly />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputNumber1 readonly />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputNumber2 readonly />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputNumber3 readonly />
    </v-col>

    <v-col cols="6">
      <ServiceOrderInputStreet readonly />
    </v-col>

    <v-col cols="1">
      <ServiceOrderInputNumber readonly />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputNeighbourhood readonly />
    </v-col>

    <v-col cols="3">
      <ServiceOrderInputComplement readonly />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputCity readonly />
    </v-col>

    <v-col cols="10">
      <ServiceOrderInputLocationMaps readonly />
    </v-col>

    <v-col cols="12">
      <ServiceOrderInputObservation readonly />
    </v-col>
  </v-row>
</template>
