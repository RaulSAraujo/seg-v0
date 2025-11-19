<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);
</script>

<template>
  <v-card title="INFORMAÇÕES ADICIONAIS">
    <v-row dense>
      <v-col>
        <UiTextArea
          v-model="apparatusData.additional_observation"
          label="Informações adicionais do aparelho"
          auto-grow
        />
      </v-col>
    </v-row>
  </v-card>
</template>
