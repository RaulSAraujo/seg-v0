<script lang="ts" setup>
import type { FileManager } from "~/interfaces/FileManager";
import type { FileWithBase64 } from "~/interfaces/FileWithBase64";

const NewGallery = defineAsyncComponent(() => import("./NewGallery.vue"));

const props = defineProps<{
  values: string[];
}>();

const { params } = useRoute();

const files = ref<FileWithBase64[]>([]);

const mimeToExt: { [key: string]: string } = {
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  pdf: "application/pdf",
};

const fetchImageData = async (filename: string) => {
  const res = await $api<FileManager>("/api/file-manager", {
    query: {
      isReadFile: true,
      route: "support-request",
      id: params.id,
      filename: filename.replace(`/${params.id}/`, ""),
    },
  });

  return res;
};

const promises = props.values.map(fetchImageData) ?? [];

const resPromises = await Promise.all(promises);

resPromises.map((promise) => {
  const ext = mimeToExt[promise.ext?.replace(".", "") ?? "jpg"];

  files.value.push({
    base64: `data:${ext};base64,${promise.data}`,
    name: promise.filename,
    type: ext ?? "image/jpeg",
  });
});
</script>

<template>
  <NewGallery :files="files" :active-remove="false" />
</template>
