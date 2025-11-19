<script setup lang="ts">
import type { RowWithRelationship } from "~/interfaces/Warranty";

defineOptions({
  name: "WarrantySubmit",
});

const props = defineProps<{
  methodRest: "POST" | "PUT";
  orders: RowWithRelationship;
}>();

const router = useRouter();

const { params } = useRoute();

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const { isDate, databaseDate } = useDateConversion();

const formatDate = (date: string) => {
  if (isDate(date)) {
    return databaseDate(date);
  } else {
    return null;
  }
};

const save = async () => {
  const newOrders = { ...props.orders } as Partial<RowWithRelationship>;

  if (!newOrders.createWithoutTag) {
    // Check if a product has been selected
    const hasSelectedProduct = newOrders.WarrantyRmaProducts?.some(
      (product) => product.selected && product.quantidade_devolvida !== 0
    );

    // Check if the number of selected tags matches the quantity returned
    const filterSelected = newOrders.WarrantyRmaProducts?.filter(
      (product) => product.selected
    );

    const hasMatchingTags = filterSelected?.every((product) => {
      const activeTags = product.tags.filter((tag) => tag.active).length;

      return (
        product.quantidade_devolvida !== 0 &&
        product.quantidade_devolvida === activeTags
      );
    });

    // Validations are only done for orders with id != 1 (balcão)
    if (newOrders.garantia !== 1) {
      if (!hasSelectedProduct) {
        return $toast().info(
          "Por favor, selecione um produto e indique a quantidade devolvida."
        );
      }

      if (
        newOrders.notafiscal_venda &&
        !hasMatchingTags &&
        props.methodRest === "POST"
      ) {
        return $toast().info(
          "Quantidade de tags devolvidas diferente da quantidade devolvida."
        );
      }
    }
  }

  loading.start();

  // Format dates
  newOrders.dtabertura = formatDate(`${newOrders.dtabertura}`);
  newOrders.dtestorno = formatDate(`${newOrders.dtestorno}`);
  newOrders.dtnotafiscal_venda = formatDate(`${newOrders.dtnotafiscal_venda}`);
  newOrders.dtnotafiscal_devolucao = formatDate(
    `${newOrders.dtnotafiscal_devolucao}`
  );

  // Set the id of the order if it's an update
  newOrders.id =
    props.methodRest === "PUT" ? parseInt(`${params.id}`) : undefined;

  // Set the packing user id
  newOrders.packing_user_id = parseInt(`${newOrders.User?.id}`) || null;

  // Remove the mercado pago value and the return value
  delete newOrders.valor_mercado_pago;
  delete newOrders.valor_devolucao;

  try {
    await $customFetch<RowWithRelationship>("warranty-rma", {
      method: props.methodRest,
      body: newOrders,
    });

    const message =
      props.methodRest === "POST"
        ? "Garantia criada com sucesso."
        : "Garantia atualizada com sucesso.";

    $toast().success(message);

    if (props.methodRest === "POST") {
      setTimeout(() => {
        router.push("/garantia");
      }, 1000);
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <ClientOnly>
    <v-fab
      icon="mdi-content-save"
      color="primary"
      class="button"
      style="position: fixed; bottom: 30px; right: 15px"
      @click="save"
    />
  </ClientOnly>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
