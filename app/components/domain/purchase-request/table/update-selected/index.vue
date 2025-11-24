<script lang="ts" setup>
import Status from "./Status.vue";
import Submit from "./Submit.vue";

import type { FormUpdateSelected } from "~/interfaces/PurchaseRequest";

const form = reactive<FormUpdateSelected>({
  status: undefined,
  observation: undefined,
});
</script>

<template>
  <v-dialog width="20vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        text="Atualizar selecionados"
        prepend-icon="mdi-playlist-check"
        stacked
        class="text-cyan"
        variant="plain"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="ATUALIZAR SELECIONADOS" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <Status v-model="form.status" />
            </v-col>

            <v-col cols="12">
              <UiTextField v-model="form.observation" label="Observação" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />

          <Submit :form="form" @close="isActive.value = false" />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
