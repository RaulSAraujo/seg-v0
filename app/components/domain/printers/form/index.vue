<script lang="ts" setup>
import Users from "./Users.vue";
import Submit from "./Submit.vue";

import type { Form } from "~/interfaces/Printers";

defineOptions({
  name: "PrintersForm",
});

const props = defineProps<{
  form: Form;
  listPrinters: string[];
}>();

const formComputed = computed(() => props.form);

defineEmits(["close"]);
</script>

<template>
  <v-card rounded="xl" title="NOVA CONFIGURAÇÃO">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <Users v-model="formComputed.user" />
        </v-col>

        <v-col cols="12">
          <UiCombobox
            v-model="formComputed.printer"
            label="Impressoras"
            :items="listPrinters"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <Submit :form="form" @close="$emit('close')" />

      <v-spacer />
    </template>
  </v-card>
</template>
