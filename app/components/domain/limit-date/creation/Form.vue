<script lang="ts" setup>
import Submit from "./Submit.vue";
import Supplier from "./Supplier.vue";

import type { Form } from "~/interfaces/LimitDate";

defineOptions({
  name: "LimitDateCreationForm",
});

const props = defineProps<{
  form: Form;
}>();

defineEmits(["submit"]);

const formComputed = computed(() => props.form);
</script>

<template>
  <v-card rounded="xl" title="NOVA DATA LIMITE">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.warning_days"
            label="Dia de aviso"
          />
        </v-col>

        <v-col cols="12">
          <Supplier v-model="formComputed.brand" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <Submit :form="formComputed" @submit="$emit('submit')" />

      <v-spacer />
    </template>
  </v-card>
</template>
