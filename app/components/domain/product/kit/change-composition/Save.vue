<script setup lang="ts">
import type { Row } from "~/interfaces/Product";
import { updateCompositionKit } from "~/services/product.service";
import { prepareKitItemForUpdate, prepareKitFamiliesForUpdate } from "~/composables/product_kit/productKitMapper";

defineOptions({
  name: "ProductKitChangeCompositionSave",
});

const { params } = useRoute();

const props = defineProps<{
  selected: Row | null;
  quantity: number;
  disabled: boolean;
}>();

const emit = defineEmits(["close"]);

const productStore = useProductStore();
const { kitList } = storeToRefs(productStore);

const loading = ref<boolean>(false);

const selected = computed(() => props.selected || ({} as Row));

const saveKitComposition = async () => {
  loading.value = true;

  try {
    const newFamily = {
      id: selected.value.type_id,
      qtd_itens: props.quantity,
    };

    const families = prepareKitFamiliesForUpdate(kitList.value, newFamily);

    await updateCompositionKit(params.type_id as string, families);

    const updatedFamily = prepareKitItemForUpdate(selected.value, props.quantity);

    kitList.value.push(updatedFamily);

    $toast().success("Kit atualizado com sucesso!");

    emit("close");
  } catch (error) {
    $toast().error(getErrorMessage(error));
  }

  loading.value = false;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="blue"
    :disabled="disabled"
    :loading="loading"
    @click="saveKitComposition()"
  />
</template>
