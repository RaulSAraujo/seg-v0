<script lang="ts" setup>
interface Form {
  invoice?: string;
  receiving_at?: string;
  status?: boolean;
}

const props = defineProps<{
  form: Form;
}>();

const { $config, $customFetch } = useNuxtApp();

const { isDate, databaseDate } = useDateConversion();

const loading = useLoadingIndicator();

const exportReceipt = async () => {
  loading.start();

  const res = await $customFetch<{ url: string }>(
    "receivement/purchase-control-product",
    {
      method: "PATCH",
      query: {
        status: props.form.status ? "RECEBIMENTO" : undefined,
        invoice: props.form.invoice,
        receiving_at: isDate(props.form.receiving_at!)
          ? databaseDate(props.form.receiving_at!)
          : props.form.receiving_at,
      },
    }
  );

  const link = document.createElement("a");
  link.href = `${$config.public.base_url_local}${res.url}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  loading.finish();
};
</script>

<template>
  <v-btn
    prepend-icon="mdi-microsoft-excel"
    text="EXPORTAR RECEBIMENTO"
    stacked
    class="text-green"
    @click="exportReceipt"
  />
</template>
