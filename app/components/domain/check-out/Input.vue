<script setup lang="ts">
const theme = useTheme();

const search = ref("");

const inputSaleId = useState<HTMLInputElement | null>("InputSaleId", () => null);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const readAndConvertValue = async () => {
  interface Tag {
    id_tag: number;
    erp_product_id: number;
    produto_chave: number;
    name: string;
  }

  if (search.value && search.value.includes("}")) {
    const tag = JSON.parse(search.value) as Tag;

    return { tag_id: tag.id_tag };
  } else {
    return { ecom_order_id: search.value };
  }
};

const { capitalizeFirstLetter } = useCapitalize();

const loadSalesOrder = async () => {
  const query = await readAndConvertValue();

  try {
    $customFetch("sales-order/checkout", {
      query: query,
      keepalive: true,
      timeout: undefined,
      retry: 0,
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);
  }

  search.value = "";

  loading.start();
};
</script>

<template>
  <v-text-field
    id="InputSaleId"
    ref="inputSaleId"
    v-model="search"
    label="Informe o numero do pedido"
    variant="outlined"
    density="compact"
    hide-details
    append-icon="mdi-send"
    class="mx-5"
    :color="theme.global.current.value.dark ? 'white' : 'black'"
    bg-color="primary"
    width="320px"
    autocomplete="off"
    focused
    @click:append="loadSalesOrder()"
    @keyup.enter="loadSalesOrder()"
  />
</template>
