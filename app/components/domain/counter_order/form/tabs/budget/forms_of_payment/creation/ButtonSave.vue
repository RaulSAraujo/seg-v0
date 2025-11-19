<script lang="ts" setup>
import { createCounterOrderPayments } from "~/services/counter-order.service";

const emit = defineEmits(["close"]);

const { params } = useRoute();
const loading = useLoadingIndicator();

const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const { payments } = storeToRefs(counterOrderPaymentsStore);

const save = async () => {
  try {
    loading.start();

    const res = await createCounterOrderPayments(params.id as string);

    payments.value.push(res);

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-btn
    color="primary"
    text="SALVAR"
    variant="flat"
    width="8vw"
    @click="save"
  />
</template>
