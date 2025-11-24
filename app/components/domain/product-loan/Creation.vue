<script setup lang="ts">
import type { Row } from "~/interfaces/ProductLoan";
import type { Row as Product } from "~/interfaces/Product";

interface Body {
  reservation: string | null;
  quantity_reserved: number;
  borrowed_to: string | null;
  observation: string;
}

const form = reactive<Body>({
  reservation: null,
  quantity_reserved: 1,
  borrowed_to: null,
  observation: "",
});

const product = ref<Product | null>(null);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const create = async () => {
  try {
    if (!product.value) {
      $toast().error("Selecione um produto.");

      return;
    }

    loading.start();

    const res = await $customFetch<Row>("product-loan", {
      method: "POST",
      body: {
        ...form,
        name: product.value?.name,
      },
    });

    $toast().success("Empréstimo criado com sucesso.");

    items.value.splice(0, 0, {
      ...res,
    });

    close();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};

const close = () => {
  form.reservation = null;
  form.quantity_reserved = 1;
  form.borrowed_to = null;
  form.observation = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="300px"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="NOVO EMPRÉSTIMO">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <ProductLoanInputBorrowedTo v-model="form.borrowed_to" />
            </v-col>

            <v-col cols="12">
              <UiFindServer
                v-model="product"
                v-maska="'X'"
                label="Digite o código de fabricante"
                base-url="product"
                param-search="name"
                item-title="name"
                item-value="name"
                :clearable="true"
                :approximate="true"
                :return-object="true"
                :params="{ full: false }"
              />
            </v-col>

            <v-col cols="12">
              <UiNumberInput
                v-model="form.quantity_reserved"
                label="Quantidade"
                :min="1"
              />
            </v-col>

            <v-col cols="12">
              <ProductLoanInputReservation v-model="form.reservation" />
            </v-col>

            <v-col cols="12">
              <UiTextField v-model="form.observation" label="Observação" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="
              async () => {
                await create();

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
