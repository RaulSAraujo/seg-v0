<script setup lang="ts">
import type { FetchError } from "ofetch";

const props = defineProps<{
  label?: string;
  itemTitle?: string;
  itemValue?: string;
  clearable?: boolean | undefined;
  returnObject?: boolean | undefined;
  baseUrl: string;
  paramSearch: string;
  params?: object;
  approximate?: boolean;
}>();

interface Response {
  rows: [];
  totalRecords: number;
  resultCount: number;
}

const search = ref<string | null>("");
const debounced = refDebounced<string | null>(search, 200);

const items = ref([]);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      try {
        const res = await $api<Response | []>(
          `/proxy/${props.baseUrl}`,
          {
            method: "GET",
            query: {
              [props.paramSearch]: props.approximate
                ? `${search.value}%`
                : search.value,
              page: 1,
              perPage: 15,
              ...props.params,
            },
          }
        );

        if ("rows" in res) {
          if (res.rows.length > 0) {
            items.value = useSorted(res.rows, (a, b) => {
              if (a[props.itemTitle as string] < b[props.itemTitle as string])
                return -1;
              if (a[props.itemTitle as string] > b[props.itemTitle as string])
                return 1;

              return 0;
            }).value;
          }
        } else {
          items.value = useSorted(res, (a, b) => {
            if (a[props.itemTitle as string] < b[props.itemTitle as string])
              return -1;
            if (a[props.itemTitle as string] > b[props.itemTitle as string])
              return 1;

            return 0;
          }).value;
        }
      } catch (error) {
        const err = error as FetchError;

        $toast().error(`${err.data.data.error ?? err.statusMessage}`);
      }
    }
  }
);
</script>

<template>
  <UiCombobox
    :label="label ?? ''"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :multiple="false"
    :return-object="returnObject"
    auto-select-first="exact"
    @update:model-value="search = $event"
  />
</template>
