<script lang="ts" setup>
import { updateOrderMl } from "~/services/order-ml.service";

import type { Row } from "~/interfaces/OrdersMl";

const props = defineProps<{
  item: Row;
}>();

const { isDate, databaseDate } = useDateConversion();

const itemComputed = computed(() => props.item);

const saveRefundDate = async (event: string) => {
  if (!isDate(event)) {
    $toast().info("Data invalida.");

    return;
  }

  itemComputed.value.refund = event ? true : false;
  itemComputed.value.refund_date = event ? databaseDate(event) : null;

  await updateOrderMl({
    id: itemComputed.value.id,
    refund: itemComputed.value.refund,
    refund_date: itemComputed.value.refund_date,
  });
};
</script>

<template>
  <UiEditDialogDate
    :date="itemComputed.refund_date"
    attr="refund_date"
    :clearable="true"
    :export-save="true"
    @export-save="saveRefundDate"
  />
</template>
