import type { FetchError } from 'ofetch'

export const useTableStore = defineStore("table", () => {
  const url = ref<string>("");

  const items = ref<object[]>([]);

  const totalItems = ref(0);

  const sortBy = ref<[{ key: string; order: boolean | "desc" | "asc" | undefined }]>();

  const loading = ref(false);

  const page = ref(1);

  const itemsPerPage = ref(10);

  const itemsPerPageOptions = ref([
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
    { value: 100, title: "100" },
  ]);

  const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

  const selected = ref([]);

  const showExpand = ref(false)

  const expanded = ref([]);

  const othersQuery = ref<object | undefined>();

  async function searchData() {
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


    try {
      loading.value = true;

      url.value = useModelStore().findApiEndpoint()

      const sortField = sortBy.value?.map((i) => i.key).join(",") ?? undefined;
      const sortType = sortBy.value?.map((i) => i.order).join(",") ?? undefined;

      const filterStore = useFilterStore();
      const { availableFilter, changeValuesFilter } = storeToRefs(filterStore);

      const { databaseDate, isDate } = useDateConversion();

      const params = availableFilter.value.reduce(
        (acc: Record<string, AccValue>, { attribute, value, layout_filters }) => {
          if (validateValue(value)) {
            // Formatação do input array data.
            if (typeof value === "string" && value.split(" - ").length === 2) {
              const array = value.split(" - ");

              for (let i = 0; i < array.length; i++) {
                array[i] = databaseDate(array[i] ?? "");
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

      if (changeValuesFilter.value) {
        page.value = 1;
      }

      interface Response {
        resultCount: number;
        rows: object[];
        totalRecords: number;
        sortBy: object[];
      }

      
      const queryParams = {
        page: page.value,
        perPage: itemsPerPage.value,
        "sort-field": sortField || undefined,
        "sort-type": sortType || undefined,
        ...othersQuery.value,
        ...params,
      };

      if (totalItems.value == 0) {
        const { data } = await $useApi<Response>(url.value, {
          method: "GET",
          query: queryParams,
          retry: 3,
          retryDelay: 500,
        });

        items.value = data.value?.rows ?? [];
        totalItems.value = data.value?.totalRecords ?? 0;
      } else {
        const res = await $api<Response>(url.value, {
          method: "GET",
          query: queryParams,
          retry: 3,
          retryDelay: 500,
        });

        items.value = res?.rows ?? [];
        totalItems.value = res?.totalRecords ?? 0;
      }

      changeValuesFilter.value = false;

      loading.value = false;
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data?.data.error || err.data?.statusMessage || 'Erro desconhecido.'}`);

      loading.value = false;
    }
  }

  function clearTableProps() {
    url.value = "";

    page.value = 1;
    itemsPerPage.value = 10;

    items.value = [];
    totalItems.value = 0;

    sortBy.value = undefined;

    selected.value = [];

    expanded.value = [];

    loading.value = true;

    othersQuery.value = undefined;

    showExpand.value = false
  }

  return {
    url,
    items,
    totalItems,
    sortBy,
    loading,
    page,
    itemsPerPage,
    itemsPerPageOptions,
    pageCount,
    selected,
    showExpand,
    expanded,
    searchData,
    othersQuery,
    clearTableProps
  };
});
