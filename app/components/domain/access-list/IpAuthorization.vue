<script setup lang="ts">
const list = ref();
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="20VW">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="AUTORIZAÇÃO POR IP"
        style="
          --v-theme-surface-variant: 7, 119, 119;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialog)"
            icon="mdi-ip"
            style="color: darkcyan"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="IPs AUTORIZADOS" rounded="xl">
        <template #append>
          <AccessListNewAuthorization @new="list.data.push($event)" />
        </template>

        <template #default>
          <AccessListCard ref="list" />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
