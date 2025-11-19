<script lang="ts" setup>
import { deletePurchaseControlProduct } from "~/services/purchase-order.service";

import type { FetchError } from "ofetch";
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
  index: number;
}>();

const emit = defineEmits(["remove"]);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const removeProduct = async () => {
  if (!props.item.id) {
    emit("remove", props.index);
  } else {
    try {
      await deletePurchaseControlProduct(props.item.id);

      emit("remove", props.index);
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data.data.error ?? err.statusText}`);
    }
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete-circle"
    color="pink"
    variant="plain"
    @click="item.id ? (snackbar = true) : removeProduct()"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="red"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deletar dados</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possível recuperar, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="removeProduct"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
