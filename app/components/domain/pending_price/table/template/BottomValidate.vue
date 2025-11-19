<script lang="ts" setup>
import { updatePendingPrice } from "~/services/pending-price.service";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const validate = async () => {
  for (const p of selected.value as Row[]) {
    p.cost_validation = !p.cost_validation;

    p.cost_validation_at = p.cost_validation == false ? null : new Date();

    updatePendingPrice(p);
  }
};
</script>

<template>
  <v-btn
    text="Validar selecionados"
    prepend-icon="mdi-playlist-check"
    stacked
    class="text-cyan"
    variant="plain"
    @click="validate"
  />
</template>
