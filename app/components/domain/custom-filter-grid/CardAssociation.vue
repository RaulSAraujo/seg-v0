<script lang="ts" setup>
const props = defineProps<{
  association: string | undefined;
  itemValue: string;
  itemName: string;
}>();

const emit = defineEmits(["updateAssociation", "updateItemValue", "updateItemName"]);

const associationComp = computed({
  get: () => props.association,
  set: (newValue) => {
    emit("updateAssociation", newValue);
  },
});

const itemValueComp = computed({
  get: () => props.itemValue,
  set: (newValue) => {
    emit("updateItemValue", newValue);
  },
});

const itemNameComp = computed({
  get: () => props.itemName,
  set: (newValue) => {
    emit("updateItemName", newValue);
  },
});
</script>

<template>
  <v-card elevation="0" density="compact">
    <template #title>
      <span class="text-body-1">Associação</span>
    </template>

    <template #subtitle>
      <span class="text-caption">Adicione dados a lista do filtro</span>
    </template>

    <template #text>
      <v-row dense>
        <v-col cols="12">
          <CustomFilterGridInputModel
            v-model="associationComp"
            label="Selecione a associação"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="itemValueComp"
            v-maska="'x'"
            label="Valor enviado para o banco"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="itemNameComp"
            v-maska="'x'"
            label="Valor exibido para o usuário"
          />
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
