<script lang="ts" setup>
defineOptions({
  name: "SupplierPasswordFilter",
});
</script>

<template>
  <UiFilter>
    <template #button-create>
      <SupplierPasswordCreation />
    </template>

    <template #menu>
      <v-tooltip location="top" text="LOGS" content-class="bg-cyan text-white">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="tooltip"
            icon="mdi-math-log"
            style="color: darkcyan"
            :to="{
              name: 'supplier-password-log',
            }"
          />
        </template>
      </v-tooltip>
    </template>
  </UiFilter>
</template>
