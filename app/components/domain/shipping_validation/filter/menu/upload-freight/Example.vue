<script lang="ts" setup>
const loading = useLoadingIndicator();
const { $customFetch, $config } = useNuxtApp();

const exemple = async () => {
  loading.start();

  try {
    const res = await $customFetch<{ filePath: string }>(
      "shipping-validation/upload-freight-table-to-gateway/example"
    );

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
  <div class="mt-2 d-flex justify-center">
    <v-btn
      text="Baixe o exemplo aqui"
      variant="plain"
      size="x-small"
      color="primary"
      @click="exemple"
    />
  </div>
</template>
