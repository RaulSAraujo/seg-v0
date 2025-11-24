<script lang="ts" setup>
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";
import { useOSProductsApi } from "~/services/service_order.service/useServiceOrderProductsApi";

const Dialog = defineAsyncComponent(() => import("./Dialog.vue"));
const Snackbar = defineAsyncComponent(() => import("./Snackbar.vue"));

defineOptions({
  name: "ServiceOrderBudgetProductsTableTemplateReserved",
});

const props = defineProps<{
  id: number;
  reserved: number;
  nameProduct: string;
}>();

const { params } = useRoute();
const loading = useLoadingIndicator();

const { update } = useOSProductsApi();

const { create } = useOSInternalObsApi();

const internalObsStore = useServiceOrderInternalObsStore();

const emit = defineEmits(["update"]);

const snackbar = ref<boolean>(false);

const dialog = ref(false);

const comp = computed({
  get: () => props.reserved,
  set: async (value) => {
    try {
      loading.start();

      if (value == 3) {
        value = 0;
      }

      if (value == 2) {
        dialog.value = true;

        return;
      }

      await update({
        id: props.id,
        reserved: value,
      });

      emit("update", value);

      if (value == 0) {
        updateCrm();
      }
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${err.data.error ?? err.statusText}`);
    } finally {
      loading.finish();
    }
  },
});

const icon = computed(() => {
  if (comp.value == 0) return "mdi-close";
  if (comp.value == 1) return "mdi-circle";
  if (comp.value == 2) return "mdi-check";

  return "";
});

const color = computed(() => {
  if (comp.value == 0) return "red";
  if (comp.value == 1) return "blue";
  if (comp.value == 2) return "green";

  return "";
});

const updateCrm = async () => {
  const find = internalObsStore.find(props.nameProduct);

  await create(params.id as string, {
    observation: "",
    is_manual: false,
    products: props.nameProduct,
    status: "REQUISIÇÃO CANCELADA",
    target_user: find?.target_user || "Todos",
  });
};
</script>

<template>
  <v-btn
    :icon="icon"
    :color="color"
    size="30"
    variant="text"
    @click="snackbar = true"
  />

  <Snackbar v-model="snackbar" @update="comp += 1" @close="snackbar = false" />

  <Dialog
    v-model="dialog"
    :product-id="id"
    :product-name="nameProduct"
    @close="dialog = false"
    @update="$emit('update', 2)"
  />
</template>
