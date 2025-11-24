<script lang="ts" setup>
import type { UserRanking } from "~/interfaces/ExpeditionDashboard";

defineProps<{
  userRanking: UserRanking[];
}>();

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Ranking", key: "rank", align: "center" },
  { title: "Usuário", key: "user" },
  { title: "Quantidade", key: "total_quantity", align: "center" },
  { title: "Peso cubico", key: "total_weight_cubic", align: "center" },
  { title: "Tempo médio (Min)", key: "average_time", align: "center" },
  { title: "Erros", key: "warranty", align: "center" },
];
</script>

<template>
  <div>
    <span class="text-h4 text-primary font-weight-black">
      RESUMO POR USUÁRIO
    </span>

    <v-data-table
      :headers="headers"
      :items="userRanking"
      disable-sort
      hide-default-footer
      class="mt-4 mb-6 rounded-xl text-h5"
      style="min-height: 300px"
    >
      <template #item.user="{ item }">
        <span class="text-uppercase">{{ item.user }}</span>
      </template>

      <template #item.warranty="{ item }">
        <v-tooltip
          location="top"
          :text="item.warranty.ids.join(', ')"
          content-class="bg-red text-white"
        >
          <template #activator="{ props: tooltip }">
            <span v-bind="item.warranty.quantity > 0 ? tooltip : {}">
              {{ item.warranty.quantity }}
            </span>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>
