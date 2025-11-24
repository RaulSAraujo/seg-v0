<script lang="ts" setup>
import { deleteCounterOrderProduct } from "~/services/counter-order.service";

defineOptions({
  name: "CounterOrderBudgetProductsTableDelete",
});

const props = defineProps<{
  id?: number;
  index: number;
}>();

const emit = defineEmits(["remove"]);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loadingIndicator = useLoadingIndicator();

const removeProduct = async () => {
  if (!props.id) return emit("remove", props.index);

  try {
    loadingIndicator.start();

    await deleteCounterOrderProduct(props.id);

    emit("remove", props.index);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loadingIndicator.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    color="pink"
    variant="plain"
    size="small"
    @click="id ? (snackbar = true) : removeProduct()"
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
