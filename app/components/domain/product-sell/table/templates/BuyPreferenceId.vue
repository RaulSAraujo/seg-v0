<script setup lang="ts">
import type { Product } from "~/interfaces/ProductSell";

const props = defineProps<{
  buyPreferenceId: number | null;
  products?: Product[];
}>();

const { $dayjs } = useNuxtApp();

const buyPreference = computed(() =>
  props.products?.find((e) => e.id == props.buyPreferenceId)
);
</script>

<template>
  <v-tooltip v-if="buyPreferenceId" bottom max-width="250">
    <template #activator="{ props: activator }">
      <v-icon v-bind="activator" icon="mdi-tag-plus" />
    </template>

    <span v-if="buyPreference">
      ID Produto: {{ buyPreference.id }}
      <br />
      Data/Hora Criação:
      {{ $dayjs(buyPreference.created_at, "YYYY-MM-DD").format("DD/MM/YYYY") }}
      <br />
      Última Alteração:
      {{ $dayjs(buyPreference.updated_at, "YYYY-MM-DD").format("DD/MM/YYYY") }}
      <br />
      Cod.Fabricante: {{ buyPreference.name }}
      <br />
      Código ERP: {{ buyPreference.erp_product_id }}
      <br />
      Aparelho: {{ buyPreference.apparatus }}
      <br />
      Marca: {{ buyPreference.brand }}
      <br />
      ESTQ Virtual: {{ buyPreference.virtual_quantity }}
      <br />
      Lead Time: {{ buyPreference.lead_time }}
      <br />
      Ativo: {{ buyPreference.active ? "Sim" : "Não" }}
      <br />
      OBS: {{ buyPreference.observation }}
    </span>
  </v-tooltip>
</template>
