<script lang="ts" setup>
import {
  creationImportOrders,
  creationImportOrdersProducts,
} from "~/services/order-import-creation.service";

import type { FetchError } from "ofetch";
import type {
  ImportOrdersProduct,
  Form,
} from "~/interfaces/ImportOrders";

defineOptions({
  name: "OrderImportCreationSubmit",
});

const props = defineProps<{
  form: Form;
  items: ImportOrdersProduct[];
}>();

const router = useRouter();
const { data: user } = useAuth();
const loading = useLoadingIndicator();

const save = async () => {
  try {
    loading.start();

    const res = await creationImportOrders({
      ...props.form,
      user: user.value!.id,
    });

    if (!res || !res.id) {
      return;
    }

    await creationProducts(res.id);

    router.push({ name: "order-import" });
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const creationProducts = async (id: number) => {
  for (const item of props.items) {
    try {
      item.order_id = id;

      await creationImportOrdersProducts(item);
    } catch (error) {
      const err = error as FetchError;

      $toast().error(`${err.data.data.error ?? err.statusText}`);
    }
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: fixed; bottom: 30px; right: 15px"
    @click="save"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
