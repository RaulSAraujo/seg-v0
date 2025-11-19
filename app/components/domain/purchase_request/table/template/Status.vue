<script setup lang="ts">
defineOptions({
  name: "PurchaseRequestTableStatus",
});

defineProps<{
  id: number;
  status: string | null;
}>();

defineEmits(["updateText"]);

const list = [
  { text: "COMPRAR" },
  { text: "OK" },
  { text: "EM ANDAMENTO" },
  { text: "EM ANÁLISE" },
  { text: "INDISPONIVEL" },
  { text: "FORA DE LINHA" },
  { text: "REJEITADO" },
  { text: "CANCELADO DELTA" },
  { text: "CANCELADO CLIENTE" },
  { text: "IMPORT" },
];

const color = (text: string | null) => {
  if (text === "COMPRAR") return "teal";
  else if (text === "OK") return "blue";
  else if (text === "EM ANDAMENTO") return "lime";
  else if (text === "EM ANÁLISE") return "red-accent-2";
  else if (text === "INDISPONIVEL") return "orange";
  else if (text === "FORA DE LINHA") return "deep-orange";
  else if (text === "REJEITADO") return "red";
  else if (text === "CANCELADO DELTA") return "pink";
  else if (text === "CANCELADO CLIENTE") return "pink darken-1";
  else if (text === "IMPORT") return "light-blue";
  else return "transparent";
};
</script>

<template>
  <UiEditDialogObject
    :id="id"
    :items="list"
    item-title="text"
    item-value="text"
    attr="status"
    :value="status"
    @update-text="$emit('updateText', $event)"
  >
    <template #default="props">
      <v-chip v-bind="props" :color="color(status)" size="small">
        {{ status }}
      </v-chip>
    </template>
  </UiEditDialogObject>
</template>
