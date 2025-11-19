<script lang="ts" setup>
defineProps<{
  text: string | null;
}>();

const color = (text: string) => {
  if (text == "OUTRAS") return "red-darken-1";
  else if (text == "JABOTICABAL") return "deep-orange";
  else if (text == "ITUVERAVA") return "green-darken-2";
  else if (text == "BARRETOS") return "purple-darken-1";
  else if (text == "RIBEIRAO PRETO") return "indigo";
  else if (text == "FRANCA") return "blue-darken-1";
  else if (text == "SÃO JOAQUIM DA BARRA") return "brown-darken-1";
  else if (text == "PASSOS") return "pink";
  else if (text == "ALFENAS") return "cyan-darken-3";
  else if (text == "GUAXUPÉ") return "teal-darken-1";
  else return "deep-orange";
};
</script>

<template>
  <v-chip v-if="text" :text="text" size="small" :color="color(text)" />
</template>
