<script lang="ts" setup>
import type { FileManager } from "~/interfaces/FileManager";

const Pdf = defineAsyncComponent(() => import("./pdf/index.vue"));
const PreviewPdf = defineAsyncComponent(() => import("./pdf/PreviewPdf.vue"));

const Image = defineAsyncComponent(() => import("./image/index.vue"));
const PreviewImage = defineAsyncComponent(
  () => import("./image/PreviewImage.vue")
);

const props = defineProps<{
  hideText?: boolean;
  pdfs: FileManager[];
  images: FileManager[];
  activeRemove?: boolean;
}>();

const emit = defineEmits(["remove"]);

const indexRef = ref(0);
const dialogPdf = ref(false);
const visibleRef = ref(false);

const imagesOnlyPath = computed(() => {
  if (props.images?.length === 0) return [];

  return props.images?.map((e) => e.data);
});

const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const showPdf = (index: number) => {
  indexRef.value = index;
  dialogPdf.value = true;
};

const remove = (index: number, filename: string) => {
  emit("remove", { index, filename });
};
</script>

<template>
  <v-row class="ma-2">
    <!-- Images -->
    <v-col
      v-for="(img, index) in images"
      :key="`img-${index}`"
      cols="12"
      sm="6"
      md="3"
      lg="2"
      xl="1"
    >
      <Image
        :index="index"
        :file="img.data"
        :name="img.filename"
        :active-remove="activeRemove"
        :hide-text="hideText"
        @dblclick="showImg(index)"
        @remove="remove(index, img.filename)"
      />
    </v-col>

    <!-- PDFs -->
    <v-col
      v-for="(pdf, index) in pdfs"
      :key="`pdf-${index}`"
      cols="12"
      sm="6"
      md="3"
      lg="2"
      xl="1"
    >
      <Pdf
        :name="pdf.filename"
        :file="pdf.data"
        :active-remove="activeRemove"
        :hide-text="hideText"
        @click="showPdf(index)"
        @remove="remove(index, pdf.filename)"
      />
    </v-col>
  </v-row>

  <PreviewImage
    :index="indexRef"
    :visible="visibleRef"
    :values="imagesOnlyPath"
    @hide="visibleRef = false"
  />

  <PreviewPdf
    v-model="dialogPdf"
    :file="dialogPdf ? pdfs[indexRef]?.data || '' : ''"
  />
</template>
