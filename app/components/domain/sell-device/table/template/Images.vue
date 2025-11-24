<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";

import type { Files } from "~/interfaces/Files";

defineOptions({
  name: "ServiceOrderTabsFilesImages",
});

const props = defineProps<{
  serviceOrder: string | number;
}>();

const { $customFetch } = useNuxtApp();

const dialog = ref(false);

const loading = ref(true);

const images = ref<Files[]>([]);

const validImageExtensions = [
  ".jpeg",
  ".jpg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
];

const pathOnly = ref<string[]>([]);

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => (visibleRef.value = false);

watch(
  () => dialog.value,
  async () => {
    if (dialog.value) {
      try {
        loading.value = true;

        const res = await $customFetch<Files[]>(`/files/service-order`, {
          query: {
            service_order_id: props.serviceOrder,
          },
        });

        const imgs = res
          ?.filter((e) =>
            validImageExtensions.includes(e.extension.toLowerCase())
          )
          .map((e) => ({
            name: e.name,
            filename: e.filename,
            extension: e.extension,
            data: `data:image/jpeg;base64,${e.data}`,
          }));

        images.value = imgs;

        pathOnly.value = imgs
          ?.filter((e) =>
            validImageExtensions.includes(e.extension.toLowerCase())
          )
          .map((e) => e.data);

        loading.value = false;
      } catch (error) {
        const err = error as { statusText: string; data: { error: string } };

        $toast().error(`${err.data.error ?? err.statusText}`);

        loading.value = false;
      }
    } else {
      images.value = [];
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="80vw">
    <template #activator="{ props: activator }">
      <v-btn
        v-bind="activator"
        icon="mdi-image-outline"
        variant="plain"
        color="primary"
        density="compact"
      />
    </template>

    <template #default>
      <v-card rounded="xl" title="IMAGENS">
        <template #text>
          <div v-if="!loading">
            <v-row v-if="images && images.length > 0" class="my-2">
              <v-col v-for="(img, i) in images" :key="i" cols="4">
                <ServiceOrderTabsFilesImage
                  :name="img.name"
                  :file="img.data"
                  @click="showImg(i)"
                />
              </v-col>
            </v-row>

            <v-sheet
              v-else
              width="100%"
              height="100"
              class="d-flex justify-center align-center"
            >
              <h3>NENHUMA ARQUIVO ENCONTRADO</h3>
            </v-sheet>

            <VueEasyLightbox
              :visible="visibleRef"
              :imgs="pathOnly"
              :index="indexRef"
              @hide="onHide"
            />
          </div>

          <div v-else class="d-flex justify-center">
            <v-progress-circular indeterminate size="80" color="primary" />
          </div>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
:deep(.v-avatar.v-avatar--size-default) {
  --v-avatar-height: 150px;
}
</style>
