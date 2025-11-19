<script setup lang="ts">
defineOptions({
  name: "CounterOrderTabsBudgetFooterDiscount",
});

const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);

const discountInput = ref<number>(0.0);

discountInput.value = form.value.discount || 0.0;

const save = () => {
  form.value.discount = discountInput.value;
};

const close = () => {
  discountInput.value = form.value.discount || 0.0;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <span class="mr-1">DESCONTO:</span>

      <UiToLocaleString
        v-bind="dialog"
        :value="form.discount"
        style="cursor: pointer"
      />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="Aplicar desconto">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiCurrencyField
                v-model="discountInput"
                label="Informe o valor do desconto"
              />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            class="mb-2"
            color="primary"
            width="8vw"
            variant="flat"
            text="SALVAR"
            @click="
              async () => {
                await save();

                isActive.value = false;
              }
            "
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
