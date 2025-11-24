<script lang="ts" setup>
const props = defineProps<{
  ecomOrderId: number;
  value: boolean;
}>();

const emit = defineEmits(["update"]);

const { $customFetch } = useNuxtApp();

const salesCollectionId = ref<number | null>(null);

const link = async () => {
  try {
    if (!salesCollectionId.value) return $toast().error("Pedido não informado.");

    if (props.value == false) {
      await $customFetch("sales-order/add-order-to-romaneio", {
        method: "POST",
        body: {
          sales_collection_id: salesCollectionId.value,
          ecom_order_id: props.ecomOrderId,
        },
      });

      emit("update", true);
    } else {
      await $customFetch("sales-order/remove-order-from-romaneio", {
        method: "POST",
        body: {
          ecom_order_id: props.ecomOrderId,
        },
      });

      emit("update", false);
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="350px">
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        :icon="value ? 'mdi-check-bold' : 'mdi-close-thick'"
        :color="value ? 'green' : 'red'"
        size="30"
        variant="text"
      />
    </template>

    <template #default>
      <v-card
        title="VINCULAR PEDIDO"
        subtitle="Vincule o pedido ao romaneio"
        rounded="xl"
      >
        <template #text>
          <UiTextField v-model="salesCollectionId" label="Digite o numero do romaneio" />
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            text="salvar"
            width="8vw"
            variant="flat"
            base-color="primary"
            @click="link"
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
