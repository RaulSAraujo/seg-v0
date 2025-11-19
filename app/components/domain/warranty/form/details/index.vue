<script lang="ts" setup>
import Cause from "./input/Cause.vue";
import Types from "./input/Types.vue";
import Statuses from "./input/Statuses.vue";
import Solutions from "./input/Solutions.vue";
import Situations from "./input/Situations.vue";
import ExpeditionProblems from "./input/ExpeditionProblems.vue";

import type { RowWithRelationship } from "~/interfaces/Warranty";

defineOptions({
  name: "WarrantyDetails",
});

const props = defineProps<{
  orders: RowWithRelationship;
}>();

const ordersComp = computed(() => props.orders);
</script>

<template>
  <div class="mb-2">
    <span class="text-h6">DETALHES DA GARANTIA</span>
  </div>

  <v-row dense>
    <v-col cols="4">
      <Cause v-model="ordersComp.causa_garantia" />
    </v-col>

    <v-col cols="4">
      <ExpeditionProblems v-model="ordersComp.expedition_problem" />
    </v-col>

    <v-col cols="4">
      <UiTextField
        :model-value="ordersComp.User?.username"
        label="Empacotador"
        :disabled="true"
      />
    </v-col>

    <v-col cols="3">
      <Solutions v-model="ordersComp.motivo_garantia" />
    </v-col>

    <v-col cols="3">
      <Types v-model="ordersComp.tipo_garantia" />
    </v-col>

    <v-col cols="3">
      <Statuses v-model="ordersComp.acao_tomada" />
    </v-col>

    <v-col cols="3">
      <Situations v-model="ordersComp.situacao_garantia" />
    </v-col>

    <v-col cols="12">
      <UiTextField v-model="ordersComp.descricao_problema" label="Observação" />
    </v-col>
  </v-row>
</template>
