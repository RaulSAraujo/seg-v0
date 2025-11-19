<script lang="ts" setup>
import type { Header } from "~/interfaces/Header";
import type { Row } from "~/interfaces/PackageLogs";

defineProps<{
  rows: Row[];
}>();

const { brDateWithTime } = useDateConversion();

const headers = ref<Header[]>([
  { title: "EMBALAGEM", key: "package", align: "center" },
  { title: "ALTURA", key: "height", align: "center" },
  { title: "LARGURA", key: "width", align: "center" },
  { title: "COMPRIMENTO", key: "length", align: "center" },
  { title: "PESO LIQUIDO", key: "weight", align: "center" },
  { title: "PESO BRUTO", key: "gross_weight", align: "center" },
  { title: "PESO CÚBICO", key: "weight_cubic", align: "center" },
  { title: "ALTERADO POR", key: "user_id" },
  { title: "CRIADO EM", key: "created_at" },
]);

const convertMetrics = (value: string) => {
  return Math.ceil(parseFloat(value || "0") * 1000).toString();
};
</script>

<template>
  <v-data-table
    :items="rows"
    disable-sort
    :headers="headers"
    hide-default-footer
    items-per-page="-1"
  >
    <template #item.package="{ item }">
      <ProductIdAfterBeforeValue
        :before="item.old_package ?? 'N/A'"
        :after="item.package ?? ''"
      />
    </template>

    <template #item.height="{ item }">
      <ProductIdAfterBeforeValue
        :before="parseFloat(item.old_height ?? '0').toFixed(2)"
        :after="parseFloat(item.height ?? '0').toFixed(2)"
      />
    </template>

    <template #item.length="{ item }">
      <ProductIdAfterBeforeValue
        :before="parseFloat(item.old_length ?? '0').toFixed(2)"
        :after="parseFloat(item.length ?? '0').toFixed(2)"
      />
    </template>

    <template #item.width="{ item }">
      <ProductIdAfterBeforeValue
        :before="parseFloat(item.old_width ?? '0').toFixed(2)"
        :after="parseFloat(item.width ?? '0').toFixed(2)"
      />
    </template>

    <template #item.weight="{ item }">
      <ProductIdAfterBeforeValue
        :before="convertMetrics(item.old_weight ?? '0')"
        :after="convertMetrics(item.weight ?? '0')"
      />
    </template>

    <template #item.gross_weight="{ item }">
      <ProductIdAfterBeforeValue
        :before="convertMetrics(item.old_gross_weight ?? '0')"
        :after="convertMetrics(item.gross_weight ?? '0')"
      />
    </template>

    <template #item.weight_cubic="{ item }">
      <ProductIdAfterBeforeValue
        :before="convertMetrics(item.old_weight_cubic ?? '0')"
        :after="convertMetrics(item.weight_cubic ?? '0')"
      />
    </template>

    <template #item.user_id="{ item }">
      <UiTooltip :text="item.User.name" :vw="5" />
    </template>

    <template #item.created_at="{ item }">
      <span>{{ brDateWithTime(`${item.created_at}`) }}</span>
    </template>
  </v-data-table>
</template>
