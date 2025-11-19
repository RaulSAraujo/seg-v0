<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  items: Row[];
}>();

const { $customFetch } = useNuxtApp();

const items = computed(() => props.items);

const search = ref("");

const add = async () => {
  if (!search.value) return;

  resetColors();

  const index = items.value.findIndex((e) => e.name == search.value);

  if (index == -1) {
    playAudioOnce(errorAudio);

    search.value = "";

    return;
  }

  const product = items.value[index];

  if (!product) return;

  await setReceivingQuantity(product.id, product.receiving_quantity);

  product.receiving_quantity += 1;

  $toast().success(
    `Cod.${product.name} || Purchased: ${product.quantity_purchased} || Receiving: ${product.receiving_quantity}`
  );

  highlightTableRow(index);

  playAudio(
    product.reservation,
    product.receiving_quantity,
    product.quantity_reserved,
    product.support,
    product.image!,
    product.measure
  );

  search.value = "";
};

const setReceivingQuantity = async (id: number, receiving_quantity: number) => {
  try {
    await $customFetch("receivement/purchase-control-product", {
      method: "PUT",
      body: {
        id: id,
        receiving_quantity: receiving_quantity + 1,
      },
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const IdAudio = "/audio/audioID_OS.mp3";
const diffAudio = "/audio/audioDiff.mp3";
const EstqAudio = "/audio/audioEstq.mp3";
const errorAudio = "/audio/audioError.mp3";

const playAudio = (
  reservation: string,
  receiving_quantity: number,
  quantity_reserved: number,
  support: boolean,
  image: boolean,
  measure: boolean
) => {
  if (reservation.includes("ID") || reservation.includes("OS")) {
    const audio = receiving_quantity > quantity_reserved ? EstqAudio : IdAudio;

    playAudioByCondition(audio, support, image, measure);
  } else if (reservation.includes("ESTOQUE")) {
    playAudioByCondition(EstqAudio, support, image, measure);
  } else {
    playAudioByCondition(diffAudio, support, image, measure);
  }
};

const playAudioByCondition = (
  audio: string,
  support: boolean,
  image: boolean,
  measure: boolean
) => {
  if (!support || !image || !measure) {
    playAudioSequence([audio, audio]);
  } else {
    playAudioOnce(audio);
  }
};

const playAudioOnce = (audioFile: string) => {
  const audio = new Audio(audioFile);
  audio.play();
};

const playAudioSequence = (audioFiles: string[]) => {
  audioFiles.forEach((audioFile, index) => {
    setTimeout(() => {
      playAudioOnce(audioFile);
    }, index * 1000);
  });
};

const highlightTableRow = (index: number) => {
  const rows = document.querySelectorAll("table tbody tr");

  const tableRow = rows[index];

  tableRow?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  tableRow?.classList.add("background-color-in-active");
};

const resetColors = () => {
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((r) => {
    r.classList.remove("background-color-in-active");
  });
};
</script>

<template>
  <UiTextField
    v-model="search"
    placeholder="Informe o código de fabricante"
    append-icon="mdi-send-outline"
    @keyup.enter="add"
    @click:append="add"
  />
</template>
