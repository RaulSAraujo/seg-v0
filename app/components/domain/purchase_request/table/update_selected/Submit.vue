<script lang="ts" setup>
import { updatePurchaseRequest } from "~/services/purchase-request.service";

import type {
  Row,
  FormUpdateSelected,
} from "~/interfaces/PurchaseRequest";

const props = defineProps<{
  form: FormUpdateSelected;
}>();

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const update = async () => {
  for (let index = 0; index < selected.value.length; index++) {
    const product = selected.value[index] as unknown as Row;

    try {
      await updatePurchaseRequest({
        id: product.id,
        ...props.form,
      });

      product.status = props.form.status!;
      product.observation = props.form.observation ?? product.observation;

      emit("close");
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${err.data.error ?? err.statusText}`);
    }
  }
};
</script>

<template>
  <v-btn text="ATUALIZAR" width="10vw" class="bg-primary" @click="update" />
</template>
