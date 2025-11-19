<script lang="ts" setup>
import type { Form } from "~/interfaces/City";

defineOptions({
  name: "CityForm",
});

defineProps<{
  title: string;
}>();

defineEmits(["save"]);

const form = reactive<Form>({
  city: "",
  state: "",
  cep: "",
  region_id: undefined,
});

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField v-model="form.city" label="Nome" />
        </v-col>
        <v-col cols="12">
          <UiTextField v-model="form.state" v-maska="'AA'" label="Estado" />
        </v-col>
        <v-col cols="12">
          <UiTextField v-model="form.cep" label="Cep" />
        </v-col>
        <v-col cols="12">
          <CityRegion v-model="form.region_id" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        class="mb-2"
        color="primary"
        width="8vw"
        variant="flat"
        text="SALVAR"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>
