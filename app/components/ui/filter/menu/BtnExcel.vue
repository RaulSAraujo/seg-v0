<script setup lang="ts">
import type { FetchError } from "ofetch";

const filterStore = useFilterStore();
const { availableFilter } = storeToRefs(filterStore);

const dayjs = useDayjs();

const { databaseDate, isDate } = useDateConversion();

const tableStore = useTableStore();
const { url, totalItems, selected, othersQuery } = storeToRefs(tableStore);

const { $config, $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const exportAll = async () => {
  try {
    type types = string | number | boolean | null | undefined;
    type AccValue = types | types[];
    const validateValue = (value: AccValue) => {
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === "string" && value.trim() === "") {
        return false;
      }

      if (typeof value === "object" && value.length === 0) {
        return false;
      }

      return true;
    };

    const query = availableFilter.value.reduce(
      (acc: Record<string, AccValue>, { attribute, value, layout_filters }) => {
        if (validateValue(value)) {
          // Formatação do input array data.
          if (typeof value === "string" && value.split(" - ").length === 2) {
            const array = value.split(" - ");

            for (let i = 0; i < array.length; i++) {
              array[i] = dayjs(array[i], "DD/MM/YYYY").format("YYYY-MM-DD");
            }

            value = array.join(",");
          }

          if (typeof value === "string" && isDate(value)) {
            value = databaseDate(value);
          }

          if (typeof value === "string" && layout_filters?.approximate) {
            value = `%${value}%`;
          }

          acc[attribute] = value;
        }

        return acc;
      },
      {}
    );

    loading.start();

    const res = await $customFetch<{ url: string }>(`${url.value}`, {
      method: "PATCH",
      body: {
        page: 1,
        perPage: totalItems.value,
        full: false,
        ...query,
      },
    });

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.url}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.error ?? err.statusMessage}`);
  } finally {
    loading.finish();
  }
};

const exportSeleted = async () => {
  try {
    const mapId = (selected.value as unknown as [Partial<{ id: number }>]).map(
      (e) => e.id
    );

    loading.start();

    const res = await $customFetch<{ url: string }>(`${url.value}`, {
      method: "PATCH",
      query: {
        id: mapId.join(","),
        ...othersQuery.value,
      },
    });

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.url}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.error ?? err.statusMessage}`);
  } finally {
    loading.finish();
  }
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
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-microsoft-excel"
        style="color: green"
        @click="selected.length > 0 ? exportSeleted() : exportAll()"
      />
    </template>
  </v-tooltip>
</template>
