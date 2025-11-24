<script setup lang="ts"></script>

<template>
  <v-dialog transition="dialog-top-transition" width="50VW">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="ANÁLISE DE USUÁRIO"
        style="
          --v-theme-surface-variant: 7, 119, 119;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialog)"
            icon="mdi-account-group-outline"
            style="color: darkcyan"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="ANÁLISE DE USUÁRIO" rounded="xl">
        <template #default>
          <v-row class="mx-2 mb-2" justify="space-between">
            <v-col cols="4">
              <CheckOutUserAnalysisDatePicker />
            </v-col>

            <v-col cols="2">
              <CheckOutUserAnalysisButton />
            </v-col>
          </v-row>

          <CheckOutUserAnalysisTable />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
