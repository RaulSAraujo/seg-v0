<script setup lang="ts">
import { creation, update } from "~/services/shipment.service";

import type { Form, Row } from "~/interfaces/ShipmentOrders";

interface Response {
  message: string;
  result: Row[];
  success: boolean;
}

defineOptions({
  name: "PackageFormSubmit",
});

const props = defineProps<{
  form: Form;
  method: "POST" | "PUT";
}>();

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = ref(false);

const send = async () => {
  try {
    loading.value = true;

    let res = {} as Response;
    if (props.method === "POST") {
      res = await creation(props.form);

      items.value.splice(0, 0, res);
    } else {
      res = await update(props.form);
    }

    $toast().success(res.message);

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="primary"
    variant="flat"
    width="8vw"
    :loading="loading"
    @click="send"
  />
</template>
