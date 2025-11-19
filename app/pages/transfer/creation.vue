<script lang="ts" setup>
useHead({
  titleTemplate: `Nova transferência - %s`,
});

definePageMeta({
  path: "/transferencia/criar",
});

const quantity = ref<number>(1);
</script>

<template>
  <div class="mt-5">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="`Voltar para chamados`"
        :to="{
          name: 'transfer',
        }"
      />
    </div>

    <span class="ml-5 text-h6 text-primary">PEÇAS A TRANSFERIR</span>

    <v-row dense class="px-4 my-5">
      <v-col cols="3">
        <TransferFindServer />
      </v-col>

      <v-col cols="3">
        <UiNumberInput
          v-model="quantity"
          label="Quantidade"
          :min="1"
          :hide-details="true"
          class="mr-2"
          style="max-width: 180px"
        />
      </v-col>

      <v-spacer />

      <v-col cols="1">
        <TransferButtonAddProduct
          :quantity="quantity"
          @clear-quantity="quantity = 1"
        />
      </v-col>
    </v-row>

    <TransferTable />

    <TransferBottomConclude />
  </div>
</template>
