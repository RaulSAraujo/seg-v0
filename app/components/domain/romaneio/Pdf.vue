<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

interface Signature {
  data: string;
  extension: string;
  filename: string;
  name: string;
  size: string;
}

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const file = ref("");

const pdf = async () => {
  try {
    loading.value = true;

    const res = await $customFetch<Signature>(
      `files/sales-collection-signature?sales_collection_id=${props.id}`
    );

    loading.value = false;

    const blob = base64ToBlob(res.data, "application/pdf");
    const url = URL.createObjectURL(blob);

    file.value = url;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};

const base64ToBlob = (base64: string, type = "application/octet-stream") => {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: type });
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="90vw" height="90vh">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        icon="mdi-file-export"
        variant="plain"
        size="small"
        :loading="loading"
        @click="pdf()"
      />
    </template>

    <template #default>
      <iframe v-if="!loading" class="my-iframe" :src="`${file}`" frameborder="0" />
    </template>
  </v-dialog>
</template>

<style scoped>
.my-iframe {
  height: 85vh;
  width: 90vw;
  border-radius: 20px;
}
</style>
