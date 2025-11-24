<script lang="ts" setup>
const props = defineProps<{
  type: string;
}>();

const types = ref([
  {
    text: "TEXTO",
    value: "STRING",
  },
  {
    text: "NUMÉRICO",
    value: "INTEGER",
  },
  {
    text: "VALOR MONETÁRIO",
    value: "FLOAT",
  },
  {
    text: "VERDADEIRO/FALSO",
    value: "BOOLEAN",
  },
  {
    text: "DATA",
    value: "DATE",
  },
  {
    text: "LISTA",
    value: "ARRAY",
  },
]);

const text = computed(() => types.value.find((e) => e.value == props.type)?.text);
</script>

<template>
  <UiTooltip :text="text" :vw="6" />
</template>
