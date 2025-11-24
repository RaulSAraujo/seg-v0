<script lang="ts" setup>
import { updateValidateStockVirtual } from "~/services/validate-stock-virtual.service";

import type { Row } from "~/interfaces/ValidateVirtualStock";

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const validate = () => {
  for (const p of selected.value as Row[]) {
    p.validated = !p.validated;
    p.validated_at = p.validated == false ? null : new Date();

    updateValidateStockVirtual({
      id: p.id,
      validated: p.validated,
    });
  }

  snackbar.value = false;
};
</script>

<template>
  <v-btn
    text="Validar selecionados"
    prepend-icon="mdi-playlist-check"
    stacked
    class="text-cyan"
    variant="plain"
    @click="snackbar = true"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="primary"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Validar selecionados</div>

    <p class="text-caption text-grey-lighten-2">
      Esse processo fará com que os selecionados sejam validados, Deseja
      continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="validate"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
