<script lang="ts" setup>
import { useErpSituationApi } from "~/composables/service_order/useErpSituationApi";

import type { Row } from "~/interfaces/GeneralReport";

defineOptions({
  name: "ExternalExcel",
});

const props = defineProps<{
  items: Row[];
}>();

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const { $config, $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const dayjs = useDayjs();

const { brDate } = useDateConversion();

const textType = (value: number) => {
  if (value == 1) return "ORÇAMENTO";
  else if (value == 3) return "FORA DE GARANTIA";
  else if (value == 6) return "GARANTIA ESTENDIDA";
  else if (value == 11) return "GARANTIA FABRICANTE";
  else if (value == 12) return "REINGRESSO GAR. FAB.";
  else if (value == 13) return "REINGRESSO FOR. GAR.";
  else if (value == 14) return "REINGRESSO GAR. EST.";
  else if (value == 15) return "COMPROVANTE ANTIGO";
  else if (value == 16) return "COMPROVANTE ENTRADA";
  else if (value == 17) return "APARELHO DELTA";
  else return "";
};

const { data } = useErpSituationApi({ lazy: true });

const exportAll = async () => {
  loading.start();

  const body = props.items.map((e) => [
    e.region,
    e.city,
    e.id,
    textType(e.type),
    e.supplier,
    e.extended_warranty,
    e.model,
    useArrayFind(data.value!, (erp) => erp.SITUACAOOS == e.status).value
      ?.DESCRSITUACAOOS,
    brDate(`${e.created_at ?? ""}`),
    e.apparatus_collected,
    parseInt(
      `${
        (e.close_order_at != null
          ? dayjs(e.close_order_at).diff(e.created_at)
          : dayjs().diff(e.created_at)) /
        (1000 * 60 * 60 * 24)
      }`
    ).toFixed(0),
  ]);

  const res = await $customFetch<{ filePath: string }>(
    `spread-sheet/generate`,
    {
      method: "POST",
      body: {
        headers: [
          "Região",
          "Cidade",
          "OS",
          "Tipo",
          "Marca",
          "GE",
          "Modelo",
          "Situação",
          "Data abertura",
          "Aparelho na ASC",
          "Tat",
        ],
        data: body,
      },
    }
  );

  loading.finish();

  const link = document.createElement("a");
  link.href = `${$config.public.base_url_local}${res.filePath}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportSelected = async () => {
  loading.start();

  const body = (selected.value as Row[]).map((e) => [
    e.region,
    e.city,
    e.id,
    textType(e.type),
    e.supplier,
    e.extended_warranty,
    e.model,
    useArrayFind(data.value!, (erp) => erp.SITUACAOOS == e.status).value
      ?.DESCRSITUACAOOS,
    brDate(`${e.created_at ?? ""}`),
    e.apparatus_collected,
    parseInt(
      `${
        (e.close_order_at != null
          ? dayjs(e.close_order_at).diff(e.created_at)
          : dayjs().diff(e.created_at)) /
        (1000 * 60 * 60 * 24)
      }`
    ).toFixed(0),
  ]);

  const res = await $customFetch<{ filePath: string }>(
    `spread-sheet/generate`,
    {
      method: "POST",
      body: {
        headers: [
          "Região",
          "Cidade",
          "OS",
          "Tipo",
          "Marca",
          "GE",
          "Modelo",
          "Situação",
          "Data abertura",
          "Aparelho na ASC",
          "Tat",
        ],
        data: body,
      },
    }
  );

  loading.finish();

  const link = document.createElement("a");
  link.href = `${$config.public.base_url_local}${res.filePath}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <v-tooltip
    location="top"
    :text="selected.length > 0 ? 'EXPORTAR SELECIONADOS' : 'EXPORTAR EXCEL'"
    style="
      --v-theme-surface-variant: 4, 117, 4;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-microsoft-excel"
        variant="plain"
        style="color: green"
        @click="selected.length > 0 ? exportSelected() : exportAll()"
      />
    </template>
  </v-tooltip>
</template>
