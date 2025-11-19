<script lang="ts" setup>
import type { Row } from "~/interfaces/SalesOrder";
import type { SalesCollections } from "~/interfaces/SalesCollections";

const props = defineProps<{
  items: Row[];
  collectCompany: string;
  quantityOrders: number;
}>();

const emit = defineEmits(["clear"]);

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const { data: user } = useAuth();

const creation = async () => {
  if (!props.collectCompany) {
    return $toast().error("Informe uma transportadora.");
  }

  try {
    loading.value = true;

    const salesOrderIds = props.items.map((e) => e.id);

    await $customFetch<SalesCollections>("sales-collection", {
      method: "POST",
      body: {
        user: user.value?.name,
        collect_company: props.collectCompany,
        quantity_orders: props.quantityOrders,
        sales_order_ids: salesOrderIds,
      },
    });

    loading.value = false;

    emit("clear");

    $toast().success("Romaneio criado com sucesso.");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    style="position: fixed; bottom: 30px; right: 15px"
    :loading="loading"
    @click="creation"
  />
</template>
