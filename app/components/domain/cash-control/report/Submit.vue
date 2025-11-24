<script lang="ts" setup>
import { generatePdfReportApi } from "~/services/cash-control.service";

defineOptions({
  name: "CashControlReportSubmit",
});

const props = defineProps<{
  date: string;
}>();

defineEmits(["close"]);

const { $config } = useNuxtApp();
const loading = useLoadingIndicator();
const { databaseDate } = useDateConversion();

const create = async () => {
  try {
    loading.start();

    const arrayDate = props.date.split(" - ").map((date) => databaseDate(date));

    if (!arrayDate[0] || !arrayDate[1]) return;

    const { url } = await generatePdfReportApi(arrayDate[0], arrayDate[1]);

    window?.open(`${$config.public.base_url_local}${url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-btn
    text="CRIAR"
    width="8vw"
    rounded="lg"
    variant="flat"
    base-color="primary"
    @click="create"
  />
</template>
