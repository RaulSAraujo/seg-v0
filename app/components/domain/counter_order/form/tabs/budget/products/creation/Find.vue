<script lang="ts" setup>
import { findProducts } from "~/services/counter-order.service";

import type { FormFindProduct } from "~/interfaces/CounterOrder";

defineOptions({
  name: "CounterOrderBudgetProductsCreationFind",
});

const emit = defineEmits(["products", "loading"]);

const form = reactive<FormFindProduct>({
  id: undefined,
  name: undefined,
  description: undefined,
});

const search = async () => {
  try {
    emit("loading", true);

    Object.entries(form).forEach(([key, value]) => {
      if (!value) {
        (form as unknown as Record<string, unknown>)[key] = undefined;
      }
    });

    const validation = Object.values(form).some(
      (e) => typeof e == "string" && e.length > 0
    );

    if (!validation) return emit("loading", false);

    const res = await findProducts(form);

    emit("products", res);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    emit("loading", false);
  }
};

const clear = () => {
  form.name = undefined;
  form.id = undefined;
  form.description = undefined;
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
        v-model="form.id"
        label="Código auxiliar"
        @keypress.enter="search"
      />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="form.description"
        label="Descrição"
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
