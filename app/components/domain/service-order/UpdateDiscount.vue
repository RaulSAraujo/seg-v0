<script setup lang="ts">
const serviceOrderStore = useServiceOrderStore();
const { discountValue } = storeToRefs(serviceOrderStore);

const discount = ref<string>("");

discount.value = discountValue.value || '';

const save = () => {
  discountValue.value = discount.value;
};

const close = () => {
  discount.value = discountValue.value || '';
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="260px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <UiToLocaleString v-bind="dialog" :value="discountValue" style="cursor: pointer" />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="Aplicar desconto">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <UiCurrencyField v-model="discount" label="Informe o valor do desconto" />
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
