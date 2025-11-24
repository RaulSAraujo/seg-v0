<script lang="ts" setup>
import { creationPurchaseRequest } from "~/services/purchase-request-creation.service";

import type { NewItems } from "~/interfaces/PurchaseRequest";

defineOptions({
  name: "PurchaseRequestCreationSubmit",
});

const props = defineProps<{
  items: NewItems[];
}>();

const emit = defineEmits(["reset"]);

const loading = ref(false);

const save = async () => {
  try {
    loading.value = true;

    for (let index = 0; index < props.items.length; index++) {
      const product = props.items[index];

      if (!product) continue;

      creationPurchaseRequest(product);
    }

    $toast().success("Sucesso ao criar as solicitações.");

    emit("reset");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    :loading="loading"
    style="position: fixed; bottom: 30px; right: 15px"
    @click="save"
  />
</template>
