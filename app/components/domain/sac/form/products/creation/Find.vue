<script lang="ts" setup>
import { findProductsApi } from "~/services/sac.service";

import type { FormProducts } from "~/interfaces/SacSale";

const emit = defineEmits(["setProducts", "loading"]);

const form = reactive<FormProducts>({
  name: undefined,
  produto_chave: undefined,
});

const search = async () => {
  try {
    emit("loading", true);

    const valid = Object.values(form).some(
      (e) => typeof e == "string" && e.length > 0
    );

    if (!valid) {
      emit("loading", true);

      return;
    }

    const rows = await findProductsApi(form);

    const products = rows.map((e) => ({
      stock: e.type == "KIT" ? e.ProductSell?.quantity : e.quantity,
      ...e,
    }));

    emit("setProducts", products);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    emit("loading", false);
  }
};

const clear = () => {
  form.name = undefined;
  form.produto_chave = undefined;
};
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <UiTextField
        v-model="form.name"
        label="Código de fabricante"
        @keypress.enter="search"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.produto_chave"
        label="Código auxiliar"
        @keypress.enter="search"
      />
    </v-col>

    <v-spacer />

    <v-col cols="2">
      <div class="d-flex">
        <v-btn
          color="primary"
          text="Limpar"
          variant="outlined"
          class="mr-2"
          @click="clear"
        />

        <v-btn color="primary" text="BUSCAR" variant="flat" @click="search" />
      </div>
    </v-col>
  </v-row>
</template>
