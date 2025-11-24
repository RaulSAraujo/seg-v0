<script lang="ts" setup>
const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiTextField v-model="form.brand" label="Marca" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.apparatus" label="Aparelho" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.model" label="Modelo" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.serial_number" label="Serial" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.version" label="Versão" disabled />
    </v-col>

    <v-col cols="2">
      <UiTextField v-model="form.inches_apparatus" label="Polegadas" />
    </v-col>

    <v-col cols="6">
      <UiTextField
        v-model="form.defect"
        label="Defeito"
        counter="100"
        hide-details="auto"
      />
    </v-col>

    <v-col cols="6">
      <UiTextField
        v-model="form.solution"
        label="Solução"
        counter="100"
        hide-details="auto"
      />
    </v-col>
  </v-row>
</template>
