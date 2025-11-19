<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  items: Row[];
}>();

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

const conclude = () => {
  loading.start();

  props.items.forEach(async (item) => {
    let status = "";
    if (item.receiving_quantity >= item.quantity_purchased) {
      status = "LIBERADO";
    } else if (item.receiving_quantity < item.quantity_purchased) {
      status = "PENDENTE";
    }

    if (status !== "") {
      try {
        await $customFetch(`receivement/purchase-control-product`, {
          method: "PUT",
          body: {
            id: item.id,
            status,
          },
        });
      } catch (error) {
        const err = error as { statusText: string; data: { error: string } };

        $toast().error(
          `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
        );
      }
    }
  });

  loading.finish();
};
</script>

<template>
  <v-btn
    prepend-icon="mdi-check-all"
    text="CONCLUIR"
    stacked
    class="text-primary"
    @click="conclude"
  />
</template>
