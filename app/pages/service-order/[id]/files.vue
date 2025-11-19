<script lang="ts" setup>
import VueEasyLightbox from "vue-easy-lightbox";

import type { Files } from "~/interfaces/Files";

// ===== COMPOSABLES E CONFIGURAÇÕES =====
const { params } = useRoute();

useHead({
  titleTemplate: `OS.${params.id} - Arquivos - %s`,
});

definePageMeta({
  path: "/ordem-servico/:id/arquivos",
});

// ===== CONSTANTES =====
const VALID_IMAGE_EXTENSIONS = [
  ".jpeg",
  ".jpg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
];
const PDF_EXTENSION = ".pdf";

// ===== ESTADO REATIVO =====
const visibleRef = ref(false);
const indexRef = ref(0);

// ===== COMPUTED PARA DADOS DA API =====
const { data, status } = await $api<Files[]>("files/service-order", {
  key: `files-${params.id}`,
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  query: {
    service_order_id: params.id,
  },
});

// ===== FUNÇÕES UTILITÁRIAS =====
const isValidImageExtension = (extension: string): boolean => {
  return VALID_IMAGE_EXTENSIONS.includes(extension.toLowerCase());
};

const createImageDataUrl = (data: string): string => {
  return `data:image/jpeg;base64,${data}`;
};

const processFiles = (files: Files[]) => {
  const images = files
    .filter((file) => isValidImageExtension(file.extension))
    .map((file) => ({
      ...file,
      data: createImageDataUrl(file.data),
    }));

  const pdfs = files.filter(
    (file) => file.extension.toLowerCase() === PDF_EXTENSION
  );

  return { images, pdfs };
};

// ===== COMPUTED PROPERTIES =====
const processedFiles = computed(() => {
  if (!data.value || status.value !== "success") {
    return { images: [], pdfs: [], imagePaths: [] };
  }

  const { images, pdfs } = processFiles(data.value);
  const imagePaths = images.map((img) => img.data);

  return { images, pdfs, imagePaths };
});

const {
  images: imgs,
  pdfs: pdfS,
  imagePaths: pathOnly,
} = toRefs(processedFiles.value);

const hasFiles = computed(() => imgs.value.length > 0 || pdfS.value.length > 0);

const isLoading = computed(() => status.value === "pending");

// ===== MÉTODOS =====
const showImg = (index: number): void => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = (): void => {
  visibleRef.value = false;
};
</script>

<template>
  <div>
    <ClientOnly>
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center my-5">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-3 text-caption">Carregando arquivos...</p>
      </div>

      <!-- Files Content -->
      <template v-else-if="hasFiles">
        <v-row class="my-2">
          <!-- Images -->
          <v-col
            v-for="(img, index) in imgs"
            :key="`img-${img.filename}-${index}`"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <ServiceOrderTabsFilesImage
              :name="img.name"
              :file="img.data"
              @click="showImg(index)"
            />
          </v-col>

          <!-- PDFs -->
          <v-col
            v-for="(pdf, index) in pdfS"
            :key="`pdf-${pdf.filename}-${index}`"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <ServiceOrderTabsFilesPdf :name="pdf.name" :file="pdf.data" />
          </v-col>
        </v-row>
      </template>

      <!-- Empty State -->
      <v-card v-else class="text-center my-5" height="150" elevation="0">
        <v-card-title class="text-primary">
          <v-icon class="me-2">mdi-file-outline</v-icon>
          Nenhum arquivo encontrado
        </v-card-title>

        <v-card-text>
          <span class="text-body-2 text-medium-emphasis">
            Nenhum arquivo foi encontrado para essa ordem de serviço
          </span>
        </v-card-text>
      </v-card>

      <!-- Lightbox -->
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="pathOnly"
        :index="indexRef"
        @hide="onHide"
      />
    </ClientOnly>
  </div>
</template>
