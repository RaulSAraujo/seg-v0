<script lang="ts" setup>
const props = defineProps<{
  excelRouteParam?: string;
}>();

const { $customFetch, $config } = useNuxtApp();

const loading = useLoadingIndicator();

const exemple = async () => {
  loading.start();

  try {
    const res = await $customFetch<{ filePath: string }>("automations/example", {
      query: {
        type: props.excelRouteParam,
      },
    });

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${res.filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};
</script>

<template>
  <div v-if="excelRouteParam" class="mt-2 d-flex justify-center">
    <v-btn
      text="Baixe o exemplo aqui"
      variant="plain"
      size="x-small"
      color="primary"
      @click="exemple"
    />
  </div>
</template>
