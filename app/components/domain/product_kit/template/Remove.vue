<script setup lang="ts">
import { removeCompositionKit } from "~/services/product-kit.service";

defineOptions({
  name: "ProductKitRemove",
});

const props = defineProps<{
  id: number;
}>();

const { params } = useRoute();

const currentTime = ref(0);
const snackbar = ref<boolean>(false);

const productStore = useProductStore();
const { kitList } = storeToRefs(productStore);

const loading = useLoadingIndicator();

const destroy = async () => {
  snackbar.value = false;

  loading.start();

  try {
    await removeCompositionKit(params.type_id as string, props.id);

    const index = useArrayFindIndex(kitList, (e) => e.id == props.id);

    kitList.value.splice(index.value, 1);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    icon="mdi-delete"
    variant="plain"
    size="small"
    color="pink"
    density="comfortable"
    @click="snackbar = true"
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
    <div class="text-subtitle-1">Remover o vinculo do produto</div>

    <p class="text-caption text-grey-lighten-2">
      Não será possível reverter esta ação, deseja continuar ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
