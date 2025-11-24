<script lang="ts" setup>
const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiTextField v-model="form.name" label="Código de fabricante" disabled />
    </v-col>

    <v-col cols="7">
      <UiTextField v-model="form.description" label="Descrição" disabled />
    </v-col>

    <v-col cols="1">
      <UiTextField v-model="form.quantity" label="Quantidade" disabled />
    </v-col>

    <v-col cols="2">
      <UiSwitch
        v-model="form.used"
        class="d-flex flex-row justify-center border-sm rounded-lg mx-1"
        label="Usado"
        :hide-details="true"
      />
    </v-col>
  </v-row>
</template>
